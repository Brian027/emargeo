import React from 'react'
import { Link } from 'react-router-dom'
import './appbar.scss'

function AppBar() {

    function toggleMenu() {
        const menuToggle = document.querySelector('.menu button')
        const navigation = document.querySelector('.subMenu')
        menuToggle.classList.toggle('active')
        navigation.classList.toggle('active')
    }
    return (
        <div className='appBar'>
            <div className="container">
                <ul className="linkNav">
                    <li className="link dashboard">
                        <Link to='/account/dashboard'>
                            <i className='bx bx-home-alt'></i>
                            <span>Tableau de bord</span>
                        </Link>
                    </li>
                    <li className="link management">
                        <Link to='/account/management'>
                            <i className='bx bx-group'></i>
                            <span>Gestion de groupes</span>
                        </Link>
                    </li>
                    <li className="link emargement">
                        <Link to='/account/emargement'>
                            <i className='bx bx-calendar'></i>
                            <span>Emargement</span>
                        </Link>
                    </li>
                    <li className="link account">
                        <Link to='/account/account'>
                            <i className='bx bx-cog'></i>
                            <span>Mes informations</span>
                        </Link>
                    </li>
                    <li className="link menu">
                        <button onClick={toggleMenu}>
                            <i className='bx bx-menu'></i>
                            <span>Menu</span>
                        </button>
                        <ul className="subMenu">
                            <li className="logout">
                                <Link to='/'>
                                    <i className='bx bx-log-out'></i>
                                    <span>Se déconnecter</span>
                                </Link>
                            </li>
                            <li className="darkMode">
                                <button>
                                    <i className='bx bx-sun'></i>
                                    <span>Mode sombre</span>
                                </button>
                                <div className="inputCheck">
                                    <label htmlFor="">
                                        <input type="checkbox" id="check" />
                                        <span className="check">
                                            <i className="bx bx-moon"></i>
                                        </span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AppBar