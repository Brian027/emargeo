import React from 'react'
import './navbar.scss'
import logo from '../../assets/images/logo-emargeo.png'
import { Link } from 'react-router-dom'

function Navbar2() {
    // Fonction pour afficher le menu mobile
    const showMenuMobile = () => {
        const menuMobile = document.querySelector('.navTopList')
        const btnMenuMobile = document.querySelector('.MenuMobileToggle')
        btnMenuMobile.classList.toggle('active')
        menuMobile.classList.toggle('active')
    }
  return (
    <>
        <nav className='navTop two'>
            <div className="container">
                <div className='navTopLeft'>
                    <img src={logo} alt="logo" />
                </div>
                <div className="navTopRight">
                    <ul className="navTopList">
                        <li className="navTopListItem">
                            <Link to='/' className='link'>Accueil</Link>
                        </li>
                        <li className="navTopListItem">
                            <Link to='/about' className='link'>A propos</Link>
                        </li>
                        <li className="navTopListItem">
                            <Link to='/contact' className='link'>Contact</Link>
                        </li>
                        <li className="navTopListItem">
                            <Link to='/signUp' className='link'>
                                <button className="btn">S'inscrire</button>
                            </Link>
                        </li>
                    </ul>
                    <div className="account">
                        <Link to='/signUp' className='link'>
                            <button className="btn">S'inscrire</button>
                        </Link>
                    </div>
                </div>
                <div className="MenuMobileToggle" onClick={showMenuMobile}>
                    <span className='line l1'></span>
                    <span className='line l2'></span>
                    <span className='line l3'></span>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar2