import React, { useReducer, useState } from 'react'
import './account.scss'
import SignIn from '../../assets/images/signIn.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthData } from '../../config/AuthWrapper'

function LogIn() {

  // Title of the page
  document.title = 'Emargeo | Se connecter'

  const { login } = AuthData();

  const navigate = useNavigate();

  // STATE
  const [formData, setFormData] = useReducer((formData, newItem) => { return ({ ...formData, ...newItem })}, {email: '', password: ''});
  const [error, setError] = useState('');

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const credentials = {
        email: formData.email,
        password: formData.password
      }

      await login(credentials);

      if(localStorage.getItem('token')) {
        navigate('/account');
      } else {
        setError('Identifiants incorrects');
      }
      
    } catch (error) {
      console.log(error);
    }

    // Vider les champs
    setFormData({email: '', password: ''});
  }
  
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
          <form onSubmit={handleSubmit}>
            <div className="formField">
              <label htmlFor="email">Email :</label>
              <input value={formData.email} type="email" id="email" name="email" placeholder='Email'
              onChange={(e) => setFormData({email: e.target.value})}
              required autoComplete='on'/>
            </div>
            <div className="formField">
              <label htmlFor="motdepasse">Mot de passe :</label>
              <input value={formData.password} type="password" id="motdepasse" name="motdepasse" placeholder='Mot de passe'
              onChange={(e) => setFormData({password: e.target.value})}
              required autoComplete='on'/>
            </div>
            <div className="info">
              <p>
                Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
              </p>
            </div>
            <div className="error">
              <p>
                {error}
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