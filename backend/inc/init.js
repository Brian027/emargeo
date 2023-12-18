const mysql = require('mysql');
const dotenv = require('dotenv').config();

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database connected');
});

// Exportation de la connexion à la base de données
module.exports = db;


// Déconnexion de la base de données lors de l'arrêt du serveur
process.on('SIGTERM', () => {
    db.end((err) => {
        if (err) {
            console.error(err);
        }
        console.log('Database disconnected');
        process.exit();
    });
});