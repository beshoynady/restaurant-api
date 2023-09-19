import React from 'react'
import './Home.css'
import { detacontext } from '../../../../App'
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams()
  return (
    <detacontext.Consumer>
      {
        ({askingForHelp ,userlogininfo, usertitle}) => {
          return (
            <main className='main-home'>
              <div className="container">
                <div className="content">
                  {userlogininfo?<p className='main-title'>مرحبا {usertitle(userlogininfo.id)} في</p>
                  :id?<p className='main-title'>مرحبا ضيوف {usertitle(id)} في</p>:<p className='main-title'>مرحبا بكم في</p>
                  }
                  <p className='main-text'>كافيار للمأكولات البحرية <br />Caviar Seafood</p>
                  <ul className="main-btn">

                    {id?<>
                    <li className='main-li' onClick={()=>askingForHelp(id)}><a>طلب الويتر</a></li>
                    <li className='main-li'><a href="#menu">المنيو</a></li>
                    </>
                    :<li className='main-li'><a href="#menu mrl-auto">المنيو</a></li>}
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