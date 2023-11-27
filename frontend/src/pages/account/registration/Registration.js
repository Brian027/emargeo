import React, { useEffect, useState } from 'react'
import './registration.scss'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import Navbar2 from '../../../components/navbars/Navbar2'
import AppBar from '../../../components/appbars/AppBar'
import ModuleCard from '../../../components/cards/ModuleCard'
import axios from 'axios'

function Registration() {
  // Title of the page
  document.title = 'Emargeo | Mes émargements'

  // State
  const [emargements, setEmargements] = useState([])

  // Fetch data
  // const fetchData = async () => {
  //   if(user.data.id) {

  //     const id_user = user.data.id

  //     axios.post('http://localhost:5000/emargementStudent', { id_user })
  //       .then((response) => {
  //         if(response.data.emargements[0].fk_statut === '2') {
  //           setEmargements(response.data.emargements)
  //         } else {
  //           setEmargements([])
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message)
  //       })
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [user.data.id])

  return (
    <>
      <Navbar2 />
      <div className='groupeManagement'>
        <div className="container">
          {/* SIDE NAV */}
          <div className="sideNavDesktop">
            <SideNav1 />
          </div>
          <div className="sideNavMobile">
            <AppBar />
          </div>
          {/* Right content */}
          <div className="rightContent">
            <div className="headerManage">
              <h2>Emargements</h2>
            </div>
            <div className="contentBox">
              <div className="nowDay">
                <h3>Aujourd'hui</h3>
              </div>
            </div>
            {
              // <ModuleCard emargements={emargements} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration