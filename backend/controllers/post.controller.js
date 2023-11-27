const bcrypt = require('bcrypt');
const init = require('../inc/init');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv').config();

// SIGNIN FUNCTION

module.exports.signIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Vérifier si l'utilisateur existe
    const sql = 'SELECT * FROM em_user WHERE email = ?';

    init.query(sql, [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas" });
        }

        const user = result[0];

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        // Mettre à jour le token
        const sql2 = 'UPDATE em_user SET token = ? WHERE id = ?';

        init.query(sql2, [token, user.id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Une erreur s'est produite" });
            }

            res.status(200).json({ message: `Bonjour ${user.prenom}`, user: user, token: token });
        });
    });

};


// SIGNUP FUNCTION

module.exports.signUp = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // Vérifier si l'utilisateur existe
    const sql = 'SELECT * FROM em_user WHERE email = ?';
    init.query(sql, [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        // Crypter le mot de passe
        const encryptedPassword = await bcrypt.hash(password, 10);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        // Créer l'utilisateur
        const sql2 = 'INSERT INTO em_user (nom, prenom, email, password, token) VALUES (?, ?, ?, ?, ?)';

        init.query(sql2, [firstName, lastName, email, encryptedPassword, token], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Une erreur s'est produite" });
            }

            res.status(200).json({ message: "Inscription réussie" });
        });
    });
};

// LOGOUT FUNCTION
module.exports.logOut = (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); // Remove Bearer from string
        const sql = `SELECT * FROM em_user WHERE id = ${req.user.id} AND token = '${token}'`;
        init.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                throw "Erreur lors de la vérification du token";
            }
            if (result.length === 0) {
                throw "Token invalide";
            } else if (result.length > 0) {
                const sql2 = 'UPDATE em_user SET token = ? WHERE id = ?';
                init.query(sql2, ['', req.user.id], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Une erreur s'est produite" });
                    }

                    res.status(200).json({ message: "Déconnexion réussie" });
                });
            } else {
                const sql2 = 'UPDATE em_formateur SET token = ? WHERE id = ?';
                init.query(sql2, ['', req.formateur.id], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Une erreur s'est produite" });
                    }
                    res.status(200).json({ message: "Déconnexion réussie" });
                });
            }
        });
    } catch (error) {
        res.status(401).send({ error })
    }
};

// GET USER FUNCTION

module.exports.getUser = (req, res) => {

    const sql = 'SELECT * FROM em_user WHERE role = "Apprenant"';

    init.query(sql, async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Aucun utilisateur trouvé" });
        } else {
            res.status(200).json({ message: "Utilisateur trouvé", users: result });
        }
    });
};

// GROUPE FUNCTION

module.exports.getGroupe = (req, res) => {

    try {
        const sql = 'SELECT g.id, g.nom_groupe FROM em_groupe g LEFT JOIN em_user u ON g.fk_user = u.id WHERE u.id = ?';

        if (req.user.role === "Formateur") {
            init.query(sql, [req.user.id], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                if (result.length === 0) {
                    return res.status(400).json({ message: "Aucun groupe trouvé" });
                } else {
                    res.status(200).json({ message: "Groupe trouvé", groupes: result });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }

};

// ADD GROUP FUNCTION

module.exports.addGroupe = (req, res) => {

    const nom_groupe = req.body.nom_groupe;
    const id_user = req.user.id;

    if (nom_groupe === undefined) {
        return res.status(400).json({ message: "Aucun formateur trouvé" });
    }

    const sql = 'SELECT * FROM em_groupe WHERE nom_groupe = ? AND fk_user = ?';
    const sql2 = 'INSERT INTO em_groupe (fk_user, nom_groupe) VALUES (?, ?)';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [nom_groupe, id_user], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }
                if (result.length > 0) {
                    return res.status(400).json({ message: "Le groupe existe déjà" });
                } else {
                    init.query(sql2, [req.user.id, nom_groupe], async (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Une erreur s'est produite" });
                        }

                        res.status(200).json({ message: "Groupe ajouté" });
                    });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
}

// UPDATE GROUP FUNCTION

module.exports.updateGroup = (req, res) => {

    const id_groupe = req.id_groupe;
    const nom_groupe = req.body.nom_groupe;

    if (id_groupe === undefined || nom_groupe === undefined) {
        return res.status(400).json({ message: "Aucun groupe trouvé" });
    }

    const sql = 'UPDATE em_groupe SET nom_groupe = ? WHERE id = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [nom_groupe, id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                res.status(200).json({ message: "Groupe modifié" });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
};

// DELETE GROUP FUNCTION

module.exports.deleteGroup = (req, res) => {

    const id_groupe = req.id_groupe;

    if (id_groupe === undefined) {
        return res.status(400).json({ message: "Aucun groupe trouvé" });
    }

    const sql = 'DELETE FROM em_groupe WHERE id = ?';
    // Supprimer les membres associer au groupe
    const sql2 = 'DELETE FROM em_membres_groupe WHERE fk_groupe = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql2, [id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }
            });

            init.query(sql, [id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                res.status(200).json({ message: "Groupe supprimé" });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
};

// MEMBERS FUNCTION

module.exports.getMembers = (req, res) => {

    const id_groupe = req.id_groupe;

    const sql = 'SELECT mg.id as id_membre, u.id as id_user, CONCAT(u.prenom," ",u.nom) as nom_membre, u.email FROM em_membres_groupe mg LEFT JOIN em_user u ON mg.fk_user = u.id LEFT JOIN em_groupe g ON mg.fk_groupe = g.id WHERE g.id = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                if (result.length === 0) {
                    return res.status(400).json({ message: "Aucun membre trouvé" });
                } else {
                    res.status(200).json({ message: "Membre trouvé", membres: result });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }
    } catch (error) {
        res.status(401).send({ error })
    }
};

// ADD MEMBER FUNCTION

module.exports.addMember = (req, res) => {

    const id_groupe = req.body.id_groupe;
    const id_user = req.body.id_user;

    if (id_groupe === undefined || id_user === undefined) {
        return res.status(400).json({ message: "Aucun groupe trouvé" });
    }

    // Vérifier si le membre existe déjà dans le groupe
    const sql = 'SELECT * FROM em_membres_groupe WHERE fk_user = ? AND fk_groupe = ?';
    const sql2 = 'INSERT INTO em_membres_groupe (fk_user, fk_groupe) VALUES (?, ?)';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_user, id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }
                if (result.length > 0) {
                    return res.status(400).json({ message: "Le membre existe déjà dans ce groupe" });
                } else {
                    init.query(sql2, [id_user, id_groupe], async (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Une erreur s'est produite" });
                        }

                        res.status(200).json({ message: "Membre ajouté" });
                    });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
}

// DELETE MEMBER FUNCTION

module.exports.deleteMember = (req, res) => {

    const id_groupe = req.id_groupe;
    const id_membre = req.id_user;

    if (id_groupe === undefined || id_membre === undefined) {
        return res.status(400).json({ message: "Aucun groupe trouvé" });
    }

    const sql = 'DELETE FROM em_membres_groupe WHERE id = ? AND fk_groupe = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_membre, id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                res.status(200).json({ message: "Membre supprimé" });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
};

// GET SESSION EMARGEMENT FUNCTION

module.exports.getSessions = (req, res) => {

    const id_formateur = req.user.id;

    // Récupérer le nom de la session
    const sql = 'SELECT s.id, CONCAT(f.nom," ",f.prenom) AS formateur, g.nom_groupe, s.debut_date, s.fin_date, s.default_debut_matin, s.default_fin_matin, s.default_debut_aprem, s.default_fin_aprem FROM em_session s LEFT JOIN em_groupe g ON s.fk_groupe = g.id LEFT JOIN em_user f ON s.fk_user = f.id WHERE s.fk_user = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_formateur], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                if (result.length === 0) {
                    return res.status(400).json({ message: "Aucune session trouvée" });
                } else {
                    res.status(200).json({ message: "Session trouvée", sessions: result });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
}

// CREATE SESSION EMARGEMENT FUNCTION

module.exports.createSession = (req, res) => {

    const id_formateur = req.user.id;
    const id_groupe = req.body.id_groupe;
    const debutDate = new Date(req.body.debutDate);
    const finDate = new Date(req.body.finDate);
    const debutMatin = req.body.debutMatin;
    const finMatin = req.body.finMatin;
    const debutAprem = req.body.debutAprem;
    const finAprem = req.body.finAprem;

    if (id_groupe === undefined || debutDate === undefined || finDate === undefined || debutMatin === undefined || finMatin === undefined || debutAprem === undefined || finAprem === undefined) {
        return res.status(400).json({ message: "Aucune session trouvée" });
    }

    const sql = 'INSERT INTO em_session (fk_user, fk_groupe, debut_date, fin_date, default_debut_matin, default_fin_matin, default_debut_aprem, default_fin_aprem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Créer une requête pour récupérer le nom du groupe
    const sql2 = 'SELECT g.nom_groupe FROM em_groupe g WHERE g.id = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_formateur, id_groupe, debutDate, finDate, debutMatin, finMatin, debutAprem, finAprem], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                init.query(sql2, [id_groupe], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Une erreur s'est produite" });
                    }

                    const groupe = result[0];

                    res.status(200).json({ message: `Session créée pour le groupe ${groupe.nom_groupe}` });
                });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
}

// UPDATE SESSION EMARGEMENT FUNCTION

module.exports.updateSession = (req, res) => {

    const id_formateur = req.user.id;
    const id_groupe = req.body.id_groupe;
    const debutDate = new Date();
    const finDate = new Date();
    const debutMatin = req.body.debutMatin;
    const finMatin = req.body.finMatin;
    const debutAprem = req.body.debutAprem;
    const finAprem = req.body.finAprem;

    if (id_groupe === undefined || debutDate === undefined || finDate === undefined || debutMatin === undefined || finMatin === undefined || debutAprem === undefined || finAprem === undefined) {
        return res.status(400).json({ message: "Aucune session trouvée" });
    }

    const sql = 'UPDATE em_session SET debut_date = ?, fin_date = ?, default_debut_matin = ?, default_fin_matin = ?, default_debut_aprem = ?, default_fin_aprem = ? WHERE fk_user = ? AND fk_groupe = ?';

    // Créer une requête pour récupérer le nom du groupe
    const sql2 = 'SELECT g.nom_groupe FROM em_groupe g WHERE g.id = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [debutDate, finDate, debutMatin, finMatin, debutAprem, finAprem, id_formateur, id_groupe], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                init.query(sql2, [id_groupe], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Une erreur s'est produite" });
                    }

                    const groupe = result[0];

                    res.status(200).json({ message: `Session modifiée pour le groupe ${groupe.nom_groupe}` });
                });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }
    } catch (error) {
        res.status(401).send({ error })
    }
};

// DELETE SESSION EMARGEMENT FUNCTION

module.exports.deleteSession = (req, res) => {

    const id_session = req.body.id_session;

    if (id_session === undefined) {
        return res.status(400).json({ message: "Aucune session trouvée" });
    }

    const sql = 'DELETE FROM em_session WHERE id = ?';

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [id_session], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                res.status(200).json({ message: "Session supprimée" });
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {
        res.status(401).send({ error })
    }
};

// SEND EMARGEMENT FUNCTION

module.exports.sendEmargement = (req, res) => {
    const id_user = req.body.id_user;

    if (id_user === undefined) {
        return res.status(400).json({ message: "Aucun utilisateur trouvé" });
    }

    const sql = 'SELECT * FROM em_statut s WHERE s.statut_name = ?';

    const defaultStatutName = 'Absent'; // Remplacez ceci par le nom de votre statut par défaut

    try {

        if (req.user.role === "Formateur") {
            init.query(sql, [defaultStatutName], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                if (result.length === 0) {
                    return res.status(400).json({ message: "Aucun statut trouvé" });
                } else {
                    const statut = result[0];
                    const id_statut = statut.id;
                    const debut_date = new Date();
                    const fin_date = new Date();

                    const sql2 = 'INSERT INTO em_emargement (fk_user, fk_statut, debut_date, fin_date) VALUES (?, ?, ?, ?)';
                    init.query(sql2, [id_user, id_statut, debut_date, fin_date], async (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Une erreur s'est produite" });
                        }

                        res.status(200).json({ message: "Emargement envoyé" });
                    });
                }
            });
        } else {
            res.status(400).json({ message: "Vous n'êtes pas formateur" });
        }

    } catch (error) {

    }
};

// GET EMARGEMENT FUNCTION

module.exports.getEmargement = (req, res) => {
    const id_user = req.user.id;

    const sql = 'SELECT e.id, e.debut_date, e.fin_date, e.fk_user, e.fk_statut, s.statut_name FROM em_emargement e LEFT JOIN em_statut s ON e.fk_statut = s.id WHERE e.fk_user = ?';

    init.query(sql, [id_user], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Aucun emargement trouvé" });
        } else {
            res.status(200).json({ message: "Emargement trouvé", emargements: result });
        }
    });
}

// SIGN EMARGEMENT FUNCTION

module.exports.signEmargement = (req, res) => {
    const { signatureData } = req.body;
    const id_user = req.user.id;

    if (id_user === undefined) {
        return res.status(400).json({ message: 'Aucun utilisateur trouvé' });
    }

    // Générer un nom unique
    const imageName = new Date().getTime();
    const base64Data = signatureData.replace(/^data:image\/png;base64,/, "");
    const path = `./uploads/${imageName}.png`;

    // Enregistrer l'image
    fs.writeFile(path, base64Data, 'base64', async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }
    });

    // Mettre à jour l'emargement

    const sql = 'SELECT * FROM em_emargement WHERE fk_user = ?';
    const sql2 = 'INSERT INTO em_archive_emargement (fk_user, fk_statut, debut_date, fin_date) VALUES (?, ?, ?, ?)';
    const sql3 = 'INSERT INTO em_media_user (fk_user, path) VALUES (?, ?)';
    const sql4 = 'DELETE FROM em_emargement WHERE fk_user = ?';

    init.query(sql, [id_user], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Une erreur s'est produite" });
        }

        const emargement = result[0];

        const sql5 = 'SELECT * FROM em_statut WHERE id = ?';
        init.query(sql5, [emargement.fk_statut], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Une erreur s'est produite" });
            }

            const statut = result[0];

            init.query(sql2, [emargement.fk_user, emargement.fk_statut, emargement.debut_date, emargement.fin_date], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Une erreur s'est produite" });
                }

                init.query(sql3, [id_user, imageName], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Une erreur s'est produite" });
                    }

                    init.query(sql4, [id_user], async (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Une erreur s'est produite" });
                        }

                        res.status(200).json({ message: 'Vous avez parfaitement signé l\'émargement', statut: statut.statut_name });
                    });
                });
            });
        });
    });
};