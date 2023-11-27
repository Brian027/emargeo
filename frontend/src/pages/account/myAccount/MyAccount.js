import React, { useReducer } from 'react'
import Navbar2 from '../../../components/navbars/Navbar2'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import AppBar from '../../../components/appbars/AppBar'
import './myAccount.scss'

function MyAccount() {

  // Title of the page
  document.title = 'Emargeo | Mon compte'

  // Use State
  const [formData, setFormData] = useReducer((state, newState) => ({ ...state, ...newState }), { nom: '', prenom: '', email: '' })

  const updateData = (e) => {

    e.preventDefault();

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
                        <span>Nom actuel: <strong>{/*user.data.nom*/}</strong></span>
                        <input type="text" onChange={(e) => { setFormData({ nom: e.target.value }) }} />
                      </label>
                      <label>
                        <span>Prénom actuel: <strong>{/*user.data.prenom*/}</strong></span>
                        <input type="text" onChange={(e) => { setFormData({ prenom: e.target.value }) }} />
                      </label>
                    </div>
                    <div className="infoContact">
                      <h4>Contact:</h4>
                      <label>
                        <span>Email actuel: <strong>{/*user.data.email*/}</strong></span>
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
                      <input type="password" />
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