const express = require('express');
const db = require('../config/database');
const app = express();

const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM t_user';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));