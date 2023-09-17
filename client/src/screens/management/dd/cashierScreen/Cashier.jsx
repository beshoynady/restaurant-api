import React from 'react'
import icon from '../image/social/facebook.svg'

const dashboard_list =[
  {icon : 'icon',title :'dashboard'},
  {icon : 'icon',title :'orders'},
  {icon : 'icon',title :'tables'},
  {icon : 'icon',title :'products'},
  {icon : 'icon',title :'employees'},
  {icon : 'icon',title :'reviews'},
]



const Cashier = () => {
  return (
    <div className='cashier-screen'>
      <header>
      <div className='logo'>
        <h1>caviar</h1>
      </div>
      <nav>
        <h1>login</h1>
      </nav>
      </header>
      <div className='content'>
        <sidebar className='dashboard_list'>
          {
            dashboard_list.map((list,i)=>{
              return <div key={i} className='list'>
                <img src={list.icon} alt="icon" />
                <p>{list.title}</p>
              </div>           
              })
          }
        </sidebar>
        <section className='dashboard_content'>
          
        </section>
      </div>
    </div>
  )
}

export default Cashier