import React, { useEffect, useState } from 'react';
import './managegroupe.scss';
import SideNav1 from '../../../components/sidenavs/SideNav1';
import Navbar2 from '../../../components/navbars/Navbar2';
import Table from '../../../components/table/Table';
import AppBar from '../../../components/appbars/AppBar';
import axios from 'axios';

function ManageGroupe() {
  document.title = 'Emargeo | Manage Groupes';

  const [state, setState] = useState({
    groupes: [],
    controlInput: '',
    selectedGroupId: '',
    membres: [],
    error: null,
  });

  useEffect(() => {
    // if (user.data.id) {

    //   axios.get('http://localhost:5000/manageGroupe')
    //     .then((response) => {
    //       const selectedGroupId = response.data.groupes[0]?.id || null;
    //       setState({
    //         groupes: response.data.groupes,
    //         selectedGroupId,
    //         controlInput: '',
    //         error: null,
    //         membres: [],
    //       });
    //     })
    //     .catch((error) => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         error: error.response.data.message,
    //       }));
    //     });
    // }
  }, []);

  const addGroupe = async () => {
    // if (user.data.id) {
    //   const id_formateur = user.data.id;
    //   const nom_groupe = state.controlInput;

    //   if (!nom_groupe) {
    //     setState((prevState) => ({
    //       ...prevState,
    //       error: 'Veuillez entrer un nom de groupe',
    //     }));
    //     return;
    //   }

    //   axios.post('http://localhost:5000/manageGroupe/add', {
    //     id_formateur,
    //     nom_groupe,
    //   })
    //     .then(() => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         controlInput: '',
    //         error: null,
    //       }));
    //     })
    //     .catch((error) => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         error: error.response.data.message,
    //       }));
    //     });
    // }
  };

  //useEffect(() => {
    // if (user.data.id && state.selectedGroupId !== null) {
    //   const id_formateur = user.data.id;
    //   const id_groupe = state.selectedGroupId;

    //   axios.post('http://localhost:5000/manageGroupe/members', {
    //     id_groupe,
    //     id_formateur,
    //   })
    //     .then((response) => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         membres: response.data.membres,
    //       }));
    //     })
    //     .catch((error) => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         error: error.response.data.message,
    //       }));
    //     });
    // }
  // }, [user.data.id, state.selectedGroupId]);

  const handleGroupChange = (event) => {
    const selectedGroupId = event.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedGroupId,
    }));
  };

  return (
    <>
      <Navbar2 />
      <div className='groupeManagement'>
        <div className="container">
          <div className="sideNavDesktop">
            <SideNav1 />
          </div>
          <div className="sideNavMobile">
            <AppBar />
          </div>
          <div className="rightContent">
            <div className="headerManage">
              <h2>Gestion des groupes</h2>
            </div>
            <div className="contentBox">
              <div className="selectChoice">
                <div className="select">
                  <select
                    name="groupe"
                    id="groupe"
                    onChange={handleGroupChange}
                    value={state.selectedGroupId}
                  >
                    {state.groupes.map((groupe) => (
                      <option key={groupe.id} value={groupe.id}>
                        {groupe.nom_groupe}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="groupeList">
                {state.groupes.map((groupe) => (
                  <button
                    className={`groupe ${state.selectedGroupId === groupe.id ? 'active' : ''}`}
                    onClick={() => handleGroupChange({ target: { value: groupe.id } })}
                    key={groupe.id}
                  >
                    {groupe.nom_groupe}
                  </button>
                ))}
              </div>
              <div className="addGroupe">
                <input
                  type="text"
                  placeholder="Nom du groupe"
                  onChange={(e) =>
                    setState((prevState) => ({ ...prevState, controlInput: e.target.value }))
                  }
                  value={state.controlInput}
                />
                <button className="add" onClick={addGroupe}>
                  <i className='bx bx-plus'></i>
                </button>
              </div>
            </div>
            <div className="table">
              {/* {state.membres.length > 0 ? (
                <Table membres={state.membres} />
              ) : (
                <div className="emptyTable">
                  <span>Aucun membre dans ce groupe</span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageGroupe;