const mysql = require('mysql');
const dotenv = require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database connected');
});

module.exports = db;

process.on('SIGTERM', () => {
    db.end((err) => {
        if (err) {
            console.error(err);
        }
        console.log('Database disconnected');
        process.exit();
    });
});