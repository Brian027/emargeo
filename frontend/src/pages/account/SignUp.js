import React, {useState} from 'react'
import './account.scss'
import { Link, useNavigate } from 'react-router-dom'
import bgSignUp from '../../assets/images/signUp.png'
import { AuthData } from '../../auth/AuthWrapper'
import { useSelector } from 'react-redux'

function SignIn() {

  // Title of the page
  document.title = 'Emargeo | Rejoignez-vous maintenant !'
  
  const { signUp } = AuthData();
  const navigate = useNavigate();

  // STATE
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [infoSubscription, setInfoSubscription] = useState('')

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send data
    try {
      await signUp(firstName, lastName, email, password);
      navigate('/signIn');
    } catch (error) {
      document.querySelector('.error').style.visibility = 'visible';
      document.querySelector('.error').style.opacity = '1';
      
      setTimeout(() => {
        document.querySelector('.error').style.visibility = 'hidden';
        document.querySelector('.error').style.opacity = '0';
        document.querySelector('.error').style.transition = 'opacity .5s ease-in-out';
      }, 3000);

      setInfoSubscription(error.response.data.message);
    }
  }

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
            <form onSubmit={handleSubmit}>
              <div className="formField">
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" placeholder='Nom' onChange={(e) => {setFirstName(e.target.value)}} required />
              </div>
              <div className="formField">
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" placeholder='Prenom' onChange={(e) => {setLastName(e.target.value)}} required />
              </div>
              <div className="formField">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" placeholder='Email' onChange={(e) => {setEmailAddress(e.target.value)}} required />
              </div>
              <div className="formField">
                <label htmlFor="motdepasse">Mot de passe :</label>
                <input type="password" id="motdepasse" name="motdepasse" placeholder='Mot de passe' onChange={(e) => {setPassword(e.target.value)}} required />
              </div>
              <div className="error">
                <p>
                  {infoSubscription}
                </p>
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