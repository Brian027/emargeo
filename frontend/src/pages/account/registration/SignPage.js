import React from 'react'
import './registration.scss'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import Navbar2 from '../../../components/navbars/Navbar2'
import AppBar from '../../../components/appbars/AppBar'
import SignPad from '../../../components/pads/SignPad'

function SignPage() {

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
            <SignPad />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignPage