const express = require('express');
const router = express.Router();
const cors = require('cors');
const { signIn, signUp, logOut, getGroupe, getMembers, createSession, getSessions, sendEmargement, getUser, getEmargement, signEmargement, addGroupe, addMember, deleteGroup, updateGroup, deleteMember, updateSession, deleteSession, } = require('../controllers/post.controller');
const { auth } = require('../middleware/auth');

router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    res.send('Server is running')
});

/* Connexion, inscription et déconnexion */
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/logOut", auth, logOut);

/* Pour récupérer les données de l'utilisateur */
router.get("/getUser", auth, getUser)

/***********************************************/
/**************** MANAGE GROUP ****************/
/***********************************************/

// Pour récupérer les données de groupe
router.get("/manageGroupe", auth, getGroupe)
// Ajout de groupe
router.post("/manageGroupe/add", auth, addGroupe)
// Pour mettre à jour les données de groupe
router.put("/manageGroupe/update/:groupId", auth, updateGroup)
// Pour supprimer un groupe
router.delete("/manageGroupe/delete/:groupId", auth, deleteGroup)

/***********************************************/
/**************** MANAGE MEMBERS ****************/
/***********************************************/

// Pour récupérer les données de membres
router.get("/manageGroupe/members/:groupId", auth, getMembers)
// Ajout de membre
router.post("/manageGroupe/members/add", auth, addMember)
// Pour supprimer un membre
router.delete("/manageGroupe/members/delete/:groupId/:userId", auth, deleteMember)


/*************************************************/
/**************** MANAGE SESSIONS ****************/
/*************************************************/

// Pour récupérer les données de sessions
router.get("/session", auth, getSessions)
// Ajout de session
router.post("/session/add", auth, createSession)
// Pour mettre à jour les données de session
router.put("/session/update", auth, updateSession)
// Pour supprimer une session
router.delete("/session/delete", auth, deleteSession)


/*****************************************************/
/**************** MANAGE EMARGEMENTS ****************/
/***************************************************/

// Pour récupérer les données d'emargement
router.get("/emargement", auth, getEmargement)

// Envoi d'emargement à l'utilisateur
router.post("/emargement/send", auth, sendEmargement)

// Permet à l'utilisateur de signer l'emargement
router.post("/emargement/sign", auth, signEmargement)

module.exports = router;