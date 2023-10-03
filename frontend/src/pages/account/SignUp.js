import React from 'react'
import './account.scss'
import { Link } from 'react-router-dom'
import bgSignUp from '../../assets/images/signUp.png'

function SignIn() {
  return (
    // PAGE D'INSCRIPTION
    <>
      <div className="signUp">
        <div className="container">
          <div className="left">
            <img src={bgSignUp} alt="signup" />
          </div>
          <div className="right">
            <div className="logo">
              <img src="favicon.png" alt="Logo de la société" />
            </div>
            <h1>Rejoignez-nous maintenant !</h1>
            <form action="#" method="post">
              <div className="formField">
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" placeholder='Nom' required />
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" placeholder='Prenom' required />
              </div>
              <div className="formField">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" placeholder='Email' required />
              </div>
              <div className="formField">
                <label htmlFor="motdepasse">Mot de passe :</label>
                <input type="password" id="motdepasse" name="motdepasse" placeholder='Mot de passe' required />
              </div>
              <div className="formField">
                <label htmlFor="type">Type :</label>
                <select name="type" id="type">
                  <option value="formateur">Formateur</option>
                  <option value="etudiant">Etudiant</option>
                  <option value="administrateur">Administrateur</option>
                </select>
              </div>
              <div className="terms">
                <p>En créant votre compte, vous acceptez nos <Link to='/cgu'>Conditions d'utilisation</Link> et notre <Link to='pc'>Politique de confidentialité</Link></p>
              </div>
              <button type="submit">S'inscrire</button>
            </form>
            <div className="separator">
              <hr />
              <span>OU</span>
              <hr />
            </div>
            <button className="google-button"><i className='bx bxl-google'></i>S'inscrire avec Google</button>
            
            <div className='already'>
              <Link to='/signIn'>
                <button className="btn">Se connecter <i className='bx bx-right-arrow-alt'></i></button>
              </Link>
            </div>

            <div className="back">
              <Link to='/'>
                <button aria-label="Retour vers l'accueil">
                  <i className='bx bx-home'></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn