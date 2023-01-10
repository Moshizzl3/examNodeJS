import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({path:'../.env'})



const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: "Mo",
    password: "mopass",
    database: "examNode",
});


export default connection;
