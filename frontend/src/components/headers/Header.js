import React from 'react'
import Card1 from '../cards/Card1'
import './header.scss'
import svgTop from '../../assets/images/Vector7.svg'
import svgBottom from '../../assets/images/vector1.svg'

function Header() {
    return (
        <>
            <header>
                <div className="vectorTop">
                    <img src={svgTop} alt="" />
                </div>
                <div className="container">
                    <div className="headerLeft">
                        <h1>Emargeo: Connectez-vous à la simplicité.</h1>
                        <p>
                            Emargeo : Simplifiez la gestion des présences avec notre plateforme
                            d'émargement en ligne, signez électroniquement en un clic !
                        </p>
                        <div className="headerLeftInput">
                            <input type="text" placeholder="Adresse e-mail" />
                            <button className="btn">S'inscrire</button>
                        </div>
                    </div>
                    <div className="headerRight">
                        <Card1 />
                    </div>
                </div>
                <div className="vectorBottom">
                    <img src={svgBottom} alt="" />
                </div>
            </header>
        </>
    )
}

export default Header