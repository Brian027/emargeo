import React from 'react'
import './account.scss'
import SignIn from '../../assets/images/signIn.png'
import { Link } from 'react-router-dom'

function LogIn() {
  return (
    // PAGE DE CONNEXION
    <div className="signIn">
      <div className="container">
        <div className="left">
          <img src={SignIn} alt="signup" />
        </div>
        <div className="right">
          <div className="logo">
            <img src="favicon.png" alt="Logo de la société" />
          </div>
          <h1>Ravie de vous revoir !</h1>
          <form action="#" method="post">
            <div className="formField">
              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" placeholder='Email' required />
            </div>
            <div className="formField">
              <label htmlFor="motdepasse">Mot de passe :</label>
              <input type="password" id="motdepasse" name="motdepasse" placeholder='Mot de passe' required />
            </div>
            <div className="info">
              <p>
                Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
              </p>
            </div>
            <button type="submit">Connexion</button>
          </form>
          <div className="separator">
            <hr />
            <span>OU</span>
            <hr />
          </div>
          <button className="google-button"><i className='bx bxl-google'></i> Se connecter avec Google</button>

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
  )
}

export default LogIn