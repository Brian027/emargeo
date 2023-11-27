import React, { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './managegroupe.scss';
import SideNav1 from '../../../components/sidenavs/SideNav1';
import Navbar2 from '../../../components/navbars/Navbar2';
import Table from '../../../components/table/Table';
import AppBar from '../../../components/appbars/AppBar';
import api from '../../../api/api';

function ManageGroupe() {
  document.title = 'Emargeo | Manage Groupes';

  const [state, setState] = useState({
    userLogged: [],
    users: [],
    groupes: [],
    membres: [],
    controlInput: '',
    textInput: '',
    selectedGroupId: '',
    isLoading: false,
    error: null,
    success: null,
  });

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    setState((prevState) => ({ ...prevState, userLogged: JSON.parse(user) }));
  }, []);

  const handleGroupChange = (event) => {
    const selectedGroupId = event.target.value;
    setState((prevState) => ({ ...prevState, selectedGroupId }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddGroup = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const groupData = {
        nom_groupe: state.controlInput,
      };

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.addGroup(groupData, token);
      const data = await response.data;

      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          groupes: [...prevState.groupes, data.groupe],
          controlInput: '',
        }));

        NotificationManager.success(data.message, 'Succès', 3000);
      }

    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.response?.data?.message }));
      NotificationManager.error(error.response?.data?.message, 'Erreur', 3000)
    }
  };

  const handleUpdateGroup = async () => {
    try {

      const token = sessionStorage.getItem('token');
      const groupId = state.selectedGroupId;

      const updatedData = {
        nom_groupe: state.textInput,
      };

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.updateGroup(groupId, updatedData, token);

      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          groupes: prevState.groupes.map((groupe) => (groupe.id === groupId ? { ...groupe, nom_groupe: updatedData.nom_groupe } : groupe)),
          controlInput: '',
        }));

        NotificationManager.success('Groupe modifié avec succès', 'Succès', 3000);
      }

      setState((prevState) => ({ ...prevState, isLoading: false }));

    } catch (error) {

      setState((prevState) => ({ ...prevState, error: error.response?.data?.message, isLoading: false }));
      NotificationManager.error(error.response?.data?.message, 'Erreur', 3000)

    }
  };

  const handleAddMember = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const memberData = {
        id_groupe: state.selectedGroupId,
        id_user: state.selectedMemberId,
      };

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.addMember(memberData, token);

      if (response.status === 200) {
        getMembers();
        setState((prevState) => ({ ...prevState, success: response.message }));
        NotificationManager.success(response.message, 'Succès', 3000);
      }

      setState((prevState) => ({ ...prevState, isLoading: false }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.response?.data?.message, isLoading: false }));
      NotificationManager.error(error.response?.data?.message, 'Erreur', 3000)
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      const token = sessionStorage.getItem('token');
      const groupId = state.selectedGroupId;

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.deleteMember(groupId, memberId, token);

      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          membres: prevState.membres.filter((membre) => membre.id !== memberId),
          success: response.data.message,
        }));
      }

      getMembers();
      setState((prevState) => ({ ...prevState, isLoading: false }));

      NotificationManager.success(response.data.message, 'Succès', 3000);

    } catch (error) {
      setState((prevState) => ({ ...prevState, error, isLoading: false }));
      NotificationManager.error(error.response?.data?.message, 'Erreur', 3000)
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const groupId = state.selectedGroupId;

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.deleteGroup(groupId, token);

      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          groupes: prevState.groupes.filter((groupe) => groupe.id !== groupId),
          membres: [],
          selectedGroupId: '',
          success: response.data.message,
        }));
      }

      setState((prevState) => ({ ...prevState, isLoading: false }));
      NotificationManager.success(response.data.message, 'Succès', 3000);

    } catch (error) {
      setState((prevState) => ({ ...prevState, error, isLoading: false }));
      NotificationManager.error(error.response?.data?.message, 'Erreur', 3000)
    }
  };

  const getGroups = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const url = api.getGroups(token);
      const response = await url;
      const data = await response.data;

      setState((prevState) => ({
        ...prevState,
        groupes: data.groupes,
        selectedGroupId: prevState.selectedGroupId || (data.groupes.length > 0 ? data.groupes[0].id : ''),
        isLoading: false,
      }));

      setState((prevState) => ({ ...prevState, isLoading: false }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error }));
    }
  };

  const getUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const url = api.getUser(token);
      const response = await url;
      const data = await response.data;

      setState((prevState) => ({ ...prevState, users: data.users }));
    } catch (error) {
      console.log(error);
    }
  };

  const getMembers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const groupId = state.selectedGroupId;

      if (!groupId) {
        setState((prevState) => ({ ...prevState, membres: [] }));
        return;
      }

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const url = api.getMembers(groupId, token);
      const response = await url;
      const data = await response.data;

      if (data.membres) {
        setState((prevState) => ({ ...prevState, membres: data.membres, isLoading: false }));
      }
    } catch (error) {
      setState((prevState) => ({ ...prevState, isLoading: false, membres: [] }));
    }
  };

  useEffect(() => {
    if (state.userLogged.id) {
      getUsers();
    }
  }, [state.groupes]);

  useEffect(() => {
    if (state.userLogged.id) {
      getGroups();
    }
  }, [state.userLogged.id]);

  useEffect(() => {
    if (state.userLogged.id && state.selectedGroupId !== null) {
      getMembers();
    }
  }, [state.selectedGroupId]);

  return (
    <>
      <NotificationContainer />
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
                    name="selectedGroupId"
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
                {state.groupes && state.groupes.length > 0 ? (
                  state.groupes.map((groupe) => (
                    <div
                      key={groupe.id}
                      className={state.selectedGroupId === groupe.id ? 'active' : ''}
                      onClick={() => setState((prevState) => ({ ...prevState, selectedGroupId: groupe.id }))}
                    >
                      <label key={groupe.id}>
                        <input
                          type="text"
                          name="controlInput"
                          defaultValue={groupe.nom_groupe}
                          onChange={(e) => { setState((prevState) => ({ ...prevState, textInput: e.target.value })) }}
                        />
                      </label>
                      <button onClick={() => handleUpdateGroup()}>
                        <i className='bx bx-check'></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty">
                    <p>Aucun groupe</p>
                  </div>
                )}
              </div>
              <div className="cta">
                <div className="addGroupe">
                  <input
                    type="text"
                    name="controlInput"
                    placeholder="Ajouter un groupe"
                    onChange={handleInputChange}
                    value={state.controlInput}
                  />
                  <button
                    className="add"
                    onClick={handleAddGroup}
                    disabled={!state.controlInput.trim()}
                  >
                    <i className='bx bx-plus'></i>
                  </button>
                </div>
                <div className="addMember">
                  <select
                    name="selectedMemberId"
                    id="membre"
                    onChange={handleInputChange}
                  >
                    <option value="">Ajouter un membre</option>
                    {state.users &&
                      state.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.prenom} {user.nom}
                        </option>
                      ))}
                  </select>
                  <button
                    className="add"
                    onClick={handleAddMember}
                    disabled={!state.selectedMemberId}
                  >
                    <i className='bx bx-plus'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="table">
              {state.isLoading ? (
                <div className="loading">
                  <span></span>
                </div>
              ) : (
                <>
                  {state.membres.length > 0 ? (
                    <Table membres={state.membres} isLoad={state.isLoading} handleDeleteMember={handleDeleteMember} />
                  ) : (
                    <div className="empty">
                      <h2>Aucun membre dans ce groupe</h2>
                    </div>
                  )}
                </>
              )}
            </div>
            {
              state.groupes ? (
                <div className="deleteGroup">
                  <button onClick={handleDeleteGroup}>
                    <i className="bx bx-check"></i>
                    <span> Supprimer le groupe </span>
                  </button>
                </div>
              ) : (
                ''
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageGroupe;