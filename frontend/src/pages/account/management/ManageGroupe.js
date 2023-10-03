import React from 'react'
import './managegroupe.scss'
import SideNav1 from '../../../components/sidenavs/SideNav1'
import Navbar2 from '../../../components/navbars/Navbar2'
import { Link } from 'react-router-dom'
import Table from '../../../components/table/Table'
import AppBar from '../../../components/appbars/AppBar'

function ManageGroupe() {
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
              <h2>Liste des groupes</h2>
            </div>
            <div className="contentBox">
              <div className="selectChoice">
                <div className="select">
                  <select name="groupe" id="groupe">
                    <option value="groupe1">Groupe 1</option>
                    <option value="groupe2">Groupe 2</option>
                    <option value="groupe3">Groupe 3</option>
                  </select>
                </div>
              </div>
              <div className="groupeList">
                <Link to='/account/management/groupe/1' className='link'><span>Groupe 1</span></Link>
                <Link to='/account/management/groupe/2' className='link'><span>Groupe 2</span></Link>
                <Link to='/account/management/groupe/3' className='link'><span>Groupe 3</span></Link>
              </div>
            </div>
            <div className="table">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageGroupe