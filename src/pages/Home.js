import React from 'react'
import './styles/home.scss'
import DefaultNavbar from '../components/navbars/DefaultNavbar'
import Header from '../components/headers/Header'

function Home() {
  document.title = 'Emargeo: Connectez-vous à la simplicité.'
  return (
    <>
        <DefaultNavbar />
        <Header />
    </>
  )
}

export default Home