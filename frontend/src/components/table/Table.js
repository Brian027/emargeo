import React from 'react'
import './table.scss'
import manAvatar from '../../assets/images/manAvatar.png'

function Table() {
  return (
    <div className='tableWrapper'>
      <table>
        <thead>
          <tr>
            <th>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </th>
            <th>
              <div className="identity">
                <i className="bx bx-user"></i>
                <span>Identité</span>
              </div>
            </th>
            <th>
              <div className="phone">
                <i className="bx bx-phone"></i>
                <span>Téléphone</span>
              </div>
            </th>
            <th>
              <div className="status">
                <i className="bx bx-mail-send"></i>
                <span>Status</span>
              </div>
            </th>
            <th>
              <div className="tag">
                <i className="bx bx-calendar"></i>
                <span>Genre</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="checkBox">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div className="identity">
                <div className="avatar">
                  <img src={manAvatar} alt="" />
                </div>
                <div className="text">
                  <div className="coord">
                    <span>John Doe</span>
                    <span>email@hotmail.fr</span>
                  </div>
                  <div className="info">
                    <span className='tel'>
                      <i className='bx bx-phone'></i>
                      <span>06 12 34 56 78</span>
                    </span>
                    <span className='status'>
                      <i className='bx bx-mail-send'></i>
                      <span>En ligne</span>
                    </span>
                    <span className="tag">
                      <i className="bx bx-calendar"></i>
                      <span>Genre: <p>Male</p></span>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="phone">
                <span>06 12 34 56 78</span>
              </div>
            </td>
            <td>
              <div className="status">
                <span>En ligne</span>
              </div>
            </td>
            <td>
              <div className="tag">
                <span>Male</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table