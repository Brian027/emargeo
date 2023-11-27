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
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Erreur interne du serveur' });
            }

            if (!result || result.length === 0) {
                return res.status(401).send({ error: 'Utilisateur non authentifié' });
            }

            if (req.params.groupId && result[0].id !== req.params.groupId) {
                req.id_groupe = req.params.groupId;
            }

            if (req.params.userId && result[0].id !== req.params.userId) {
                req.id_user = req.params.userId;
            }

            req.user = result[0];
            req.token = token;

            next();
        });
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Token invalide' });
    }
}

module.exports = { auth };