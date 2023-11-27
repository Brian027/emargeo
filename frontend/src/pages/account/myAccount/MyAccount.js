import React, { useEffect, useReducer, useState } from 'react'
import Navbar2 from '../../../components/navbars/Navbar2'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import AppBar from '../../../components/appbars/AppBar'
import './myAccount.scss'

function MyAccount() {
  
  // Titre de la page
  document.title = 'Emargeo | Mon compte'

  // Gestions des données de l'utilisateur
  const [user, setUser] = useState([])
  
  // Gestions des données du formulaire
  const [formData, setFormData] = useReducer((state, newState) => ({ ...state, ...newState }), { nom: '', prenom: '', email: '' })

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    sessionStorage.getItem('user') && setUser(JSON.parse(sessionStorage.getItem('user')))
  }, [])

  // Update data
  const updateData = (e) => {
    e.preventDefault();

    try {

      console.log(formData);
      
    } catch (error) {
      
    }

  }

  return (
    <>
      <Navbar2 />
      <div className='myAccount'>
        <div className="container">
          {/* SIDE NAV */}
          <div className="sideNavDesktop">
            <SideNav1 />
          </div>
          <div className="sideNavMobile">
            <AppBar />
          </div>
          <div className="rightContent">
            <div className="headerManage">
              <h2>Informations générales</h2>
            </div>
            <div className="contentBox">
              <form onSubmit={updateData}>
                <div className="infoPersonnel">
                  <div className="info">
                    <div className="idendityUser">
                      <h4>Identité:</h4>
                      <label>
                        <span>Nom actuel: <strong>{user.nom}</strong></span>
                        <input type="text" onChange={(e) => { setFormData({ nom: e.target.value }) }} />
                      </label>
                      <label>
                        <span>Prénom actuel: <strong>{user.prenom}</strong></span>
                        <input type="text" onChange={(e) => { setFormData({ prenom: e.target.value }) }} />
                      </label>
                    </div>
                    <div className="infoContact">
                      <h4>Contact:</h4>
                      <label>
                        <span>Email actuel: <strong>{user.email}</strong></span>
                        <input type="text" onChange={(e) => { setFormData({ email: e.target.value }) }} />
                      </label>
                      <label>
                        <span>Téléphone actuel: <strong>0102030405</strong></span>
                        <input type="text" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="separator">
                  <div className="line"></div>
                  <div className="circle"></div>
                  <div className="line"></div>
                </div>
                <div className="secretPassword">
                  <div className="info">
                    <h4>Sécurité:</h4>
                    <label>
                      <span>Mot de passe actuel:</span>
                      <input type="text"/>
                    </label>
                    <label>
                      <span>Nouveau mot de passe:</span>
                      <input type="password" />
                    </label>
                    <label>
                      <span>Confirmer le nouveau mot de passe:</span>
                      <input type="password" />
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="footerManage">
              <button>Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount