import React from 'react'
import './NavBar.css'
import { detacontext } from '../../../../App'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <detacontext.Consumer>
      {
        ({ usertitle,userlogininfo, logout }) => {
          return (

            <header className='manag-header'>
              <div className='container'>
                <nav className='manag-nav'>
                  <div className="profile">
                    <div className="info">
                      <p>اهلا, <b>{userlogininfo?usertitle(userlogininfo.id):''}</b></p>
                    </div>
                    <div className="logout-btn">
                      <a href='/login' onClick={logout}>خروج</a>
                    </div>
                  </div>

                </nav>
              </div>
            </header>
          )
        }
      }
    </detacontext.Consumer>
  )
}

export default NavBar