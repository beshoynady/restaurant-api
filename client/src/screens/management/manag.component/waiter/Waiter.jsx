import React, { useState, useEffect, useRef } from 'react'
import { detacontext } from '../../../../App'
import './Waiter.css'
import axios from 'axios'


const Waiter = () => {
  const start = useRef()
  const ready = useRef()
  const [orderactive, setorderactive] = useState([])

  const GetPrductstowaiter = async () => {
    try {
      const orders = await axios.get('http://localhost:8000/api/order');
      // console.log(orders)
      const orderisctive = await orders.data.filter((order) => order.isActive == true && order.status == 'تم التحضير'|| order.status == 'في الطريق')
      console.log(orderisctive)
      setorderactive(orderisctive)

    } catch (error) {
      console.log(error)
    }
  }

  const orderOnWay=async(id)=>{
    // const waiter = waiterid;
    const status = 'في الطريق'
    const done = await axios.put('http://localhost:8000/api/order/' + id, {
    status
  })
  GetPrductstowaiter()
  console.log(done)
}

  const orderDelivered = async (id) => {
    const order = await axios.get('http://localhost:8000/api/order/' + id)
    // console.log(order)
    const cloneproduct = await order.data.products
    // console.log(cloneproduct)
    const products = []
    for (let i = 0; i < cloneproduct.length; i++) {
      cloneproduct[i].isDone = true;
      products.push(cloneproduct[i])
    }
    console.log(products)
    const status = 'تم التوصيل'
    const done = await axios.put('http://localhost:8000/api/order/' + id, {
      products,
      status
    })
    GetPrductstowaiter()
  }

  // const orderDone = async (id) => {
  //   console.log(id)
  //   const order = await axios.get('http://localhost:8000/api/order/' + id)
  //   // console.log(order)
  //   const cloneproduct = await order.data.products
  //   // console.log(cloneproduct)
  //   const products = []
  //   for (let i = 0; i < cloneproduct.length; i++) {
  //     cloneproduct[i].isDone = true;
  //     products.push(cloneproduct[i])
  //   }
  //   console.log(products)
  //   const status = 'Done'
  //   const done = await axios.put('http://localhost:8000/api/order/' + id, {
  //     products,
  //     status
  //   })
  //   GetPrductstowaiter()
  // }

  useEffect(() => {
    GetPrductstowaiter()
  }, [])

  return (
    <detacontext.Consumer>
      {
        ({ usertitle, userlogininfo}) => {
          return (
            <div className='Waiter'>
              {orderactive && orderactive.map((order, i) => {
                if (order.products.filter((pr) => pr.isDone == false).length > 0) {
                  return (
                    <div className="wai-card" key={i}>
                      <div className="card-info">
                        <p className="info-p">اسم العميل {order.table != null ? usertitle(order.table) : usertitle(order.user)}</p>
                        <p className="info-p">رقم الطلب {order.serial}</p>
                        <p className="info-p">نوع الطلب {order.order_type}</p>
                        <p className="info-p">اسم الويتر {usertitle(order.waiter)}</p>
                        <p className="info-p">وقت الاستلام {new Date(order.createdAt).getHours()+":"+ new Date(order.createdAt).getMinutes() }</p>
                        <p className="info-p">وقت التنفيذ {new Date(order.updatedAt).getHours() +":"+ new Date(order.updatedAt).getMinutes() }</p>
                      </div>
                      <div className="card-product">
                        <ul className='card-ul'>
                          {order.products.filter((pr) => pr.isDone == false) && order.products.filter((pr) => pr.isDone == false).map((product, i) => {
                            return (
                              <li className='card-li' key={i}>
                                <p className='product-name'>{i + 1}- {product.name}</p>
                                <span className='product-quantity'> × {product.quantity}</span>
                              </li>
                            )
                          })
                          }

                        </ul>
                      </div>
                      <div className='card-btn'>
                        {order.status == 'تم التحضير' ?
                        <button ref={ready} className='btn-ready' onClick={() => { orderOnWay(order._id) }}>استلام الاوردر</button>
                          : <button ref={start} className='btn-start' onClick={() => orderDelivered(order._id)}>تم التسليم</button>
                        }
                      </div>
                    </div>
                  )
                }

              })}
            </div>
          )
        }
      }
    </detacontext.Consumer>
  )

}

export default Waiter