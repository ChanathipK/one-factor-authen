import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mySqlConnect from "./src/db.js";
import userRouter from "./src/userRouter.js";

// dotenv is configured in ./src/userRouter.js
const app = express();

// setup basic middlewares

// cors with a specific origin
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
}));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// routing
app.use("/users", userRouter);

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, async (req, res) => {
    const dbConnection = await mySqlConnect(
        process.env.DB_HOST,
        process.env.DB_PORT,
        process.env.MYSQL_USERNAME,
        process.env.MYSQL_PASS,
        process.env.DATABASE,
    );
    try {
        const [result, fields] = await dbConnection.query(
            `SHOW TABLES;`,
        );
        if (! result.some(obj => Object.values(obj).includes("user_creds"))) {
            try {
                await dbConnection.query(
                    `CREATE TABLE user_creds (
                        uuid VARCHAR(36) PRIMARY KEY,
                        username VARCHAR(24) UNIQUE,
                        password VARCHAR(255) NOT NULL
                    );`
                )
                await dbConnection.query(
                    `ALTER TABLE user_creds AUTO_INCREMENT=100000`
                );
                console.log(`user_creds table created`);
            } catch (err) {
                console.log(err);
            }
        } 
    } catch (err) {
        console.log(err);
    }
    console.log("Server is listening at " + SERVER_PORT);
})