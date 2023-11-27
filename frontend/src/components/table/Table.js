import React, { useEffect, useState } from 'react';
import './table.scss';
import manAvatar from '../../assets/images/manAvatar.png';
import axios from 'axios';
import api from '../../api/api';

function Table({ membres, handleDeleteMember }) {

  // Regrouper les états
  const [state, setState] = useState({
    sessions: [],
    emargements: [],
    members: [],
    isLoading: true,
  });

  useEffect(() => {
    // Mise à jour de l'état des membres
    setState((prevState) => ({ ...prevState, members: membres }));
  }, [membres]);

  // Fonction pour envoyer la signature
  const handleSendSignature = async () => {
    const selectedMembers = state.members.filter((member) => member.isChecked);

    if (selectedMembers.length < 1) {
      console.log('Aucun membre sélectionné');
      return;
    }

    
    selectedMembers.forEach(async (member) => {
      
      const token = sessionStorage.getItem('token');
      const emargementData = {
        id_user: member.id_user,
      }

      await api.sendEmargement(token, emargementData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  // Logique pour afficher le statut d'un membre
  const renderStatut = (id_user) => {
    if (!state.emargements.length) {
      return <span>Pas envoyé</span>;
    }

    const memberEmargement = state.emargements.find((e) => e.fk_user === id_user);

    if (memberEmargement) {
      return <span>{memberEmargement.statut_name}</span>;
    } else {
      return <span>Pas envoyé</span>;
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'checkAll') {
      let tempMember = state.members.map((member) => ({ ...member, isChecked: checked }));
      setState((prevState) => ({ ...prevState, members: tempMember }));
    } else {
      let tempMember = state.members.map((member) =>
        member.nom_membre === name ? { ...member, isChecked: checked } : member
      );
      setState((prevState) => ({ ...prevState, members: tempMember }));
    };
  };

  return (
    <div className='tableWrapper'>
      <table>
        <thead>
          <tr>
            <th>
              <div className="checkBox thead">
                <input
                  type="checkbox"
                  name="checkAll"
                  checked={state.members.filter((member) => member?.isChecked !== true).length < 1}
                  onChange={handleChange}
                />
              </div>
            </th>
            <th>
              <div className="id">
                <i className="bx bx-id-card"></i>
                <span>Id membre</span>
              </div>
            </th>
            <th>
              <div className="identity">
                <i className="bx bx-user"></i>
                <span>Identité</span>
              </div>
            </th>
            <th>
              <div className="statut">
                <i className="bx bx-check"></i>
                <span>Statut</span>
              </div>
            </th>
            <th>
              <div className="action">
                <span>Action</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            state.members && state.members.length > 0 ? (
              state.members.map((member, index) => (
                <tr key={index}>
                  <td>
                    <div className="checkBox tbody">
                      <input
                        type="checkbox"
                        name={member.nom_membre}
                        checked={member?.isChecked || false}
                        onChange={handleChange}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="id">
                      <span>{member.id_membre}</span>
                    </div>
                  </td>
                  <td>
                    <div className="identity">
                      <div className="avatar">
                        <img src={manAvatar} alt="" />
                      </div>
                      <div className="text">
                        <div className="idUser">
                          <p>Id user:</p>
                          <span>{member.id_user}</span>
                        </div>
                        <div className="coord">
                          <span>{member.nom_membre}</span>
                          <span>{member.email}</span>
                        </div>
                        <div className="info">
                          <span className='tel'>
                            <i className='bx bx-phone'></i>
                            <span>0102030405</span>
                          </span>
                          <span className="tag">
                            <i className="bx bx-calendar"></i>
                            <span>Sexe: <p>Masculin</p></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="statut">
                      {renderStatut(member.id_user)}
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button
                        onClick={() => handleDeleteMember(member.id_membre)}
                      ><i className='bx bx-trash'></i></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="empty">
                    <p>Aucun membre dans ce groupe</p>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div className="sendEmargement">
                {state.isLoading ? (
                  <button
                    className={state.members.filter((member) => member.isChecked === true).length < 1 ? '' : 'active'}
                    onClick={handleSendSignature}
                  >
                    <i className="bx bx-check"></i>
                    <span> Envoyer </span>
                  </button>
                ) : (
                  <button
                    className={state.members.filter((member) => member.isChecked === true).length < 1 ? '' : 'active'}
                    onClick={handleSendSignature}
                  >
                    <i className="bx bx-check"></i>
                    <span> Envoyer </span>
                  </button>
                )}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;