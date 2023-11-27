import React, { useEffect, useState } from 'react'
import './navbar.scss'
import logo from '../../assets/images/logo-emargeo.png'
import { Link } from 'react-router-dom'

function DefaultNavbar() {

    // Savoir si l'utilisateur est connecté
    const [isLogged, setIsLogged] = useState(false)
    
    // Récupérer le token de l'utilisateur
    const token = sessionStorage.getItem('token')
    
    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        if(token) {
            setIsLogged(true)
        }
    }, [token])

    // Fonction pour afficher le menu mobile
    const showMenuMobile = () => {
        const menuMobile = document.querySelector('.navTopList')
        const btnMenuMobile = document.querySelector('.MenuMobileToggle')
        btnMenuMobile.classList.toggle('active')
        menuMobile.classList.toggle('active')
    }
    
  return (
    <>
        <nav className='navTop default'>
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
                            <Link to='/' className='link'>A propos</Link>
                        </li>
                        <li className="navTopListItem">
                            <Link to='/' className='link'>Contact</Link>
                        </li>
                        <li className="navTopListItem">
                            {
                                isLogged ? (
                                    <Link to='/account' className='link'>
                                        <button>Mon compte</button>
                                    </Link>
                                ) : (
                                    <Link to='/signUp' className='link'>
                                        <button>S'inscrire</button>
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                    <div className="account">
                        {
                            isLogged ? (
                                <Link to='/account' className='link'>
                                    <button>Mon compte</button>
                                </Link>
                            ) : (
                                <Link to='/signIn' className='link'>
                                    <button>Se connecter</button>
                                </Link>
                            )
                        }
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

export default DefaultNavbar