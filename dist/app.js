"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const mysql_1 = require("mysql");
require('dotenv').config();
// const mysql = require('mysql');
// Routes
const index = require('./routes/index');
const app = express();
app.use(express.json());
http.createServer(app);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(index);
const connection = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'test' });
});
/* connection.query(
  'create table articles (id int auto_increment primary key, title varchar(255) null, description varchar(1000) null, URL varchar(255) null, employeeID int null, usersDisliked varchar(255) null, usersLiked    varchar(255)  null);',
  function (error: any, result: any) {
    if (error) throw error;
    console.log('Table created');
  }
); */
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
/* function getArticles() {
  connection.connect(async function (error: any) {
    if (error) throw error;
    console.log('Connected!');
    // HANDLE YOUR LOGIC HERE
    connection.end((error: any) => {
      console.log('Closed connection');
      if (error) {
        throw new Error(error);
      }
    });
  });
}
 */
exports.default = app;
//# sourceMappingURL=app.js.map