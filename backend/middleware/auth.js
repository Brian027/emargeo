const init = require('../inc/init');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization').replace('Bearer ', ''); // Remove Bearer from string
        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Get user
        const sql = `SELECT * FROM em_user WHERE id = ${decoded.id} AND token = '${token}'`;
        
        init.query(sql, (err, result) => {
            if (err) throw 'Erreur sql';

            req.user = result[0];
            req.token = token;
            next();
        });
    } catch (error) {
        res.status(401).send({ error })
    }
}

module.exports = { auth };