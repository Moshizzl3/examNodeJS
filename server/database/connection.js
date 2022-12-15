import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({path:'../.env'})



const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "Mo",
    password: "mopass",
    database: "examNode",
});


export default connection;
