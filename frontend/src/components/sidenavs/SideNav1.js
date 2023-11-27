import React from 'react';
import './sidenav.scss';
import manAvatar from '../../assets/images/manAvatar.png';
import { Link } from 'react-router-dom';

function SideNav1() {

    // Dark mode
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
    };

    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
    };

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className='sideNav'>
            <div className="wrapper">
                <div className="headerNav">
                    <div className="userProfile">
                        <div className="userImg">
                            <img src={manAvatar} alt="" />
                        </div>
                        <div className="userName">
                            <h4>
                                
                            </h4>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="bodyNav">
                    <div className="linkContainer">
                        <div className="dashboard">
                            <button>
                                <i className='bx bx-home-alt'></i>
                                <span>Tableau de bord</span>
                            </button>
                        </div>
                        {/* {user.data.role === "Formateur" && (
                            <div className="management">
                                <button className=''>
                                    <i className='bx bx-group'></i>
                                    <Link to="/manageGroupe"><span>Gestion de groupes</span></Link>
                                </button>
                            </div>
                        )} */}
                        {/* {
                            user.data.role === "Formateur" ? (
                                <div className="sessionEmargement">
                                    <button>
                                        <i className='bx bx-calendar'></i>
                                        <Link to="/session"><span>Session d'emargement</span></Link>
                                    </button>
                                </div>

                            ) : (
                                <div className="emargement">
                                    <button>
                                        <i className='bx bx-calendar'></i>
                                        <Link to="/emargement"><span>Emargement</span></Link>
                                    </button>
                                </div>
                            )
                        } */}
                        <div className="account">
                            <button>
                                <i className='bx bx-cog'></i>
                                <Link to="/account"><span>Mes informations</span></Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footerNav">
                    <div className="logout">
                        <button> {/* Assurez-vous d'importer la fonction logout */}
                            <i className='bx bx-log-out'></i>
                            <span>Se déconnecter</span>
                        </button>
                    </div>
                    <div className="darkMode">
                        <button>
                            <i className='bx bx-sun'></i>
                            <span>Mode sombre</span>
                        </button>
                        <div className="inputCheck">
                            <label htmlFor="">
                                <input type="checkbox" id="check" onChange={toggleTheme} />
                                <span className="check">
                                    <i className="bx bx-moon"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNav1;