import mySqlConnect from "./db.js";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";

dotenv.config({
    path: [
        "./.env.production",
        "./.env.development"
    ],
});

const connection = await mySqlConnect(
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASS,
    process.env.DATABASE,
);

const SALT_ROUNDS = 12;
const SECRET = process.env.SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const [result, reason] = await validateCredentials(username, password);
            if (result) {
                res.status(201).json({
                    username,
                });
            } else {
                res.status(400).json({
                    reason,
                });
            }
        } else {
            res.status(400).json({
                reason: "missing credentials",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

async function validateCredentials(username, password) {
    try {
        if (
            typeof username == "string" &&
            typeof password == "string" &&
            validator.isAscii(username) &&
            /^[a-zA-Z0-9_]{3,15}$/.test(username) &&
            validator.isStrongPassword(password) &&
            validator.isAscii(password)
        ){
            return await createCredentials(username, password);
        }
        return [false, "validation failed"];
    } catch (err) {
        console.log(err);
        return [false, "server error"];
    }
}

async function createCredentials(username, password) {
    try {
        const [users] = await connection.execute(
            `SELECT username FROM user_creds WHERE username = ${username};`
        );
        if (users.length != 0) {
            return [false, "username not unique"];
        }
        const uuid = uuidv4();
        const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
        await connection.execute(
            `INSERT INTO user_creds (uuid, username, password) VALUES (?, ?, ?);`,
            [uuid, username, hashed_password],
        );
        return [true, "success"];
    } catch (err) {
        console.log(err);
        return [false, "server error"];
    }
}

export default router;