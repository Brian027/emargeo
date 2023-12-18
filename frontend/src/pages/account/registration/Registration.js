import React, { useEffect, useState } from 'react'
import './registration.scss'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import Navbar2 from '../../../components/navbars/Navbar2'
import AppBar from '../../../components/appbars/AppBar'
import ModuleCard from '../../../components/cards/ModuleCard'
import api from '../../../api/api'

function Registration() {
  // Title of the page
  document.title = 'Emargeo | Mes émargements'

  // State
  const [emargements, setEmargements] = useState([])

  // Get emargements
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const url = api.getEmargements(token)
      const response = await url

      if (response.status === 200) {
        setEmargements(response.data.emargements)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
              <ModuleCard emargements={emargements} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration