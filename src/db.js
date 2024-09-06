import mysql2 from "mysql2/promise"

let connection;

export default async function mySqlConnect(dbhost, dbport, dbusername, dbpass, database) {
    if (!connection) {
        connection = await mysql2.createConnection({
            host: dbhost,
            port: dbport,
            user: dbusername,
            password: dbpass,
            database: database,
        });
        console.log("Connected to MySQL");
    }
    return connection;
};