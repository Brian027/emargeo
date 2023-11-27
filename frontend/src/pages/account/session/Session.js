import React, { useState, useEffect } from 'react';
import './session.scss';
import SideNav1 from '../../../components/sidenavs/SideNav1';
import Navbar2 from '../../../components/navbars/Navbar2';
import AppBar from '../../../components/appbars/AppBar';
import api from '../../../api/api';

function Session() {

  const [state, setState] = useState({
    sessions: [],
    error: '',
    success: '',
  });

  const [formData, setFormData] = useState({
    debutDate: '',
    finDate: '',
    debutMatin: '',
    finMatin: '',
    debutAprem: '',
    finAprem: ''
  });

  const handleAddSession = async (event) => {
    try {

      const token = sessionStorage.getItem('token');
      const sessionData = {
        debutDate: formData.debutDate,
        finDate: formData.finDate,
        debutMatin: formData.debutMatin,
        finMatin: formData.finMatin,
        debutAprem: formData.debutAprem,
        finAprem: formData.finAprem
      };

      const url = api.addSession(sessionData, token);
      const response = await url;
      const responseData = response.data;

      if (response.status === 200) {
        setState({
          ...state,
          sessions: [...state.sessions, responseData.session],
        });
      }

    } catch (error) {

    }
  }

  // Récupérer les sessions
  const getSessions = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const url = api.getSessions(token);
      const response = await url;
      const sessionsData = response.data;

      if (sessionsData) {
        setState({ ...state, sessions: sessionsData.sessions });
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSessions();
  }, []);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const show = (anything) => {
    document.querySelector('.sessionList').value = anything;
  };

  const toggleActive = () => {
    document.querySelector('.wrapperSessionList').classList.toggle('active');
  };
  // Fonction pour formater l'heure actuelle au format "HH:mm:ss"
  const formatCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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
                    <div className="startDate">
                      <label htmlFor="debutDate">Date de début</label>
                      <input
                        type="date"
                        name="debutDate"
                        defaultValue={
                          new Date().getFullYear()
                          + '-' +
                          (new Date().getMonth() + 1)
                          + '-' +
                          new Date().getDate()
                        }
                        onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endDate">
                      <label htmlFor="finDate">Date de fin</label>
                      <input
                        type="date"
                        name="finDate"
                        defaultValue={
                          new Date().getFullYear()
                          + '-' +
                          (new Date().getMonth() + 1)
                          + '-' +
                          new Date().getDate()
                        }
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <div className="startTime">
                      <label htmlFor="debutMatin">Début matin</label>
                      <input
                        type="time"
                        name="debutMatin"
                        defaultValue="08:00:00"
                        onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endTime">
                      <label htmlFor="finMatin">Fin matin</label>
                      <input
                        type="time"
                        name="finMatin"
                        defaultValue="12:00:00"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <div className="startTime">
                      <label htmlFor="debutAprem">Début après-midi</label>
                      <input
                        type="time"
                        name="debutAprem"
                        defaultValue="13:00:00"
                        onChange={handleFormChange}
                      />
                    </div>
                    <hr />
                    <div className="endTime">
                      <label htmlFor="finAprem">Fin après-midi</label>
                      <input
                        type="time"
                        name="finAprem"
                        defaultValue="16:30:00"
                        onChange={handleFormChange}
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
                    {state.sessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => show(session.nom_groupe)}
                      >
                        {session.nom_groupe}
                      </div>
                    ))}
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