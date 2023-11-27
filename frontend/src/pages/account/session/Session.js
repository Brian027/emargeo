import React, { useState, useEffect } from 'react';
import './session.scss';
import SideNav1 from '../../../components/sidenavs/SideNav1';
import Navbar2 from '../../../components/navbars/Navbar2';
import AppBar from '../../../components/appbars/AppBar';
import axios from 'axios';

function Session() {

  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    // id_formateur: user.data.id || '',
    id_groupe: '',
    debutDate: '',
    finDate: '',
    debutMatin: '',
    finMatin: '',
    debutAprem: '',
    finAprem: ''
  });

  const [groupe, setGroupe] = useState("");

  // useEffect(() => {
  //   if (user.data.id) {
  //     const id_formateur = user.data.id;

  //     axios.post('http://localhost:5000/manageGroupe', { id_formateur })
  //       .then((response) => {
  //         setGroupe(response.data.groupes[0]);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   }
  // }, [user.data.id]);

  // useEffect(() => {
  //   if (user.data.id) {
  //     const id_formateur = user.data.id;
  //     axios.post('http://localhost:5000/session', { id_formateur })
  //       .then((response) => {
  //         setSessions(response.data.sessions);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   }
  // }, [user.data.id]);

  // const handleFormChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const submitSession = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:5000/session/add', formData)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const show = (anything) => {
    document.querySelector('.sessionList').value = anything;
  };

  const toggleActive = () => {
    document.querySelector('.wrapperSessionList').classList.toggle('active');
  };

  return (
    <>
      <Navbar2 />
      <div className="sessionEmargement">
        <div className="container">
          <div className="sideNavDesktop">
            <SideNav1 />
          </div>
          <div className="sideNavMobile">
            <AppBar />
          </div>
          <div className="rightContainer">
            <div className="headerManage">
              <h2>Session d'émargement</h2>
            </div>
            <div className="contentBox">
              <div className="leftContentBox">
                <form>
                  <div className="formField">
                    <input
                      type="hidden"
                      name="id_formateur"
                      value={formData.id_formateur}
                      // onChange={handleFormChange}
                    />
                  </div>
                  <div className="formField">
                    <input
                      type="hidden"
                      name="id_groupe"
                      value={formData.id_groupe || (groupe && groupe.id) || ""}
                      // onChange={handleFormChange}
                    />
                  </div>
                  <div className="formField">
                    <div className="startDate">
                      <label htmlFor="debutDate">Date de début</label>
                      <input
                        type="date"
                        name="debutDate"
                        value={formData.debutDate}
                        // onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endDate">
                      <label htmlFor="finDate">Date de fin</label>
                      <input
                        type="date"
                        name="finDate"
                        value={formData.finDate}
                        // onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <div className="startTime">
                      <label htmlFor="debutMatin">Début matin</label>
                      <input
                        type="time"
                        name="debutMatin"
                        value={formData.debutMatin}
                        // onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endTime">
                      <label htmlFor="finMatin">Fin matin</label>
                      <input
                        type="time"
                        name="finMatin"
                        value={formData.finMatin}
                        // onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <div className="startTime">
                      <label htmlFor="debutAprem">Début après-midi</label>
                      <input
                        type="time"
                        name="debutAprem"
                        value={formData.debutAprem}
                        // onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endTime">
                      <label htmlFor="finAprem">Fin après-midi</label>
                      <input
                        type="time"
                        name="finAprem"
                        value={formData.finAprem}
                        // onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <button type="submit">Créer une session</button>
                </form>
              </div>
              <div className="rightContentBox">
                <div className="wrapperSessionList" onClick={toggleActive}>
                  <input
                    type="text"
                    name="sessionList"
                    className="sessionList"
                    placeholder="Liste des sessions"
                    readOnly
                  />
                  <div className="option">
                    {/* {sessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => show(session.nom_groupe)}
                      >
                        {session.nom_groupe}
                      </div>
                    ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Session;