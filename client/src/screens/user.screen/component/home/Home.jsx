import React from 'react'
import './Home.css'
import { detacontext } from '../../../../App'
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams()
  return (
    <detacontext.Consumer>
      {
        ({askingForHelp }) => {
          return (
            <main className='main-home'>
              <div className="container">
                <div className="content">
                  <p className='main-title'>مرحبا بكم في</p>
                  <p className='main-text'>كافيار للمأكولات البحرية <br />Caviar Seafood</p>
                  <ul className="main-btn">
                    <li className='main-li' onClick={()=>askingForHelp(id)}><a>طلب الويتر</a></li>
                    <li className='main-li'><a href="#menu">المنيو</a></li>
                  </ul>
                </div>
              </div>
            </main>
          )
        }
      }
    </detacontext.Consumer>
  )

}

export default Home