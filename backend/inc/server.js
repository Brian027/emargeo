const init = require('../inc/init');
const express = require('express');
const app = express();

const cors = require('cors');
const router = require('../routes/post.routes');

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(5000, () => console.log('Server running on port 5000'));

// Gestion du signal SIGINT pour déconnecter proprement la base de données
process.on('SIGINT', () => {
    console.log('Arrêt du serveur. Déconnexion de la base de données...');
    init.end((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion de la base de données :', err);
      } else {
        console.log('Base de données déconnectée.');
      }
      app.close(() => {
        console.log('Serveur arrêté.');
        process.exit();
      })
    });
});