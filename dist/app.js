"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());
http.createServer(app);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    insecureAuth: true,
});
connection.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('MySQL connection established');
    }
});
// Drops all of the tables so they can be recreated
// dropTables(connection);
// Recreates all of the tables
// initDatabase(connection);
// Populates the database with content
// populateDatabase(connection);
app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'test' });
});
app.get('/articles', (req, res, next) => {
    connection.connect();
    connection.query('SELECT * FROM articles ORDER BY id DESC LIMIT 10', function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'Unable to fetch articles',
            });
        }
        return res.status(200).json({
            articles: result,
        });
    });
    connection.end((error) => {
        console.log('Closed connection');
        if (error) {
            throw new Error(error);
        }
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map