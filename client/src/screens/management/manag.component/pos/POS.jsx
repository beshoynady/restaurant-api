import React, { useState,useRef } from 'react'
import { detacontext } from '../../../../App'
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import './POS.css'

const POS = () => {
  const ordersText = useRef()
  const orderside = useRef()
  const printContainer = useRef()
  const handlePrint = useReactToPrint({
    content: () => printContainer.current,
    copyStyles: true,
    removeAfterPrint: true,
    bodyClass: 'printpage'
  });

  const { id } = useParams()

  const [itemid, setitemid] = useState([])
  const [noteArea, setnoteArea] = useState(false)
  const [productid, setproductid] = useState('')


  const opensidebar = () => {
    sidebar.current.classList.toggle("toggle-width")
    menuicon.current.classList.toggle("rotate")
  }

  const sidebar = useRef()
  const menuicon = useRef()
  return (
    <detacontext.Consumer>
      {
        ({allProducts, allcategories,userlogininfo, setcategoryid, filterByCategoryId, categoryid, additemtocart, deleteitems, increment, descrement, setproductnote, addnotrstoproduct, usertitle, itemsincart, costOrder, createclientorder, invoice, totalinvoice, list_produccts_order, orderupdate_date, myorder, checkout }) => {
          return (
            <div className='pos-section'>
              <nav className='pos-category'>
                  <ul className='category-ul'>
                    {allcategories.map((c, i) => <li key={i} className='category-li'>
                      <a className='category-pos-btn' onClick={() => setcategoryid(c._id)}>{c.name}</a>
                    </li>
                    )}
                  </ul>
              </nav>
              <div className='pos-menu'>
                {allProducts.filter(pro => pro.category === categoryid).map((product, index) => {
                  return (
                    <div className="pos-card" key={index} onClick={() => { if (product.quantity > 0) { additemtocart(product._id, product.quantity) }}}>
                      <img className='pos-img-card' src={`https://raw.githubusercontent.com/beshoynady/restaurant-api/main/server/images/${product.image}`} alt="" />
                      {product._id == productid & noteArea == true ? <form onSubmit={(e) => { addnotrstoproduct(e, product._id);; setnoteArea(!noteArea) }}>
                        <textarea placeholder='اضف تعليماتك الخاصة بهذا الطبق' name="note" cols="100" rows="3" onChange={(e) => { setproductnote(e.target.value) }}></textarea>
                        <div className='note-btn'>
                          <button>تاكيد</button>
                          <button onClick={() => setnoteArea(!noteArea)}>الغاء</button>
                        </div>
                      </form> : ''}

                      <div className="pos-card-detalis">
                        {/* <div className='pos-card-head'> */}
                          <div className='card-name'>
                            <div className='product-name'>{product.name}</div>
                            <div className='product-price'>{product.price}ج</div>
                            {/* <span className="material-symbols-outlined card-note" onClick={() => { setnoteArea(!noteArea); setproductid(product._id) }}>note_alt</span> */}
                          </div>
                          <div className='card-discription'>{product.description}</div>
                        {/* </div> */}
                        {/* <div className="card-price">
                          <p>{product.price}ج</p>
                          <div className="card-counter">
                            <button className='symb' onClick={() => descrement(product._id)}>-</button>
                            <span className='num'>{product.quantity}</span>
                            <button className='symb' onClick={() => increment(product._id)}>+</button>
                          </div>
                        </div> */}
                        <div className='pos-btn'>
                        {/* <button className='addtocart-btn' onClick={() => { if (product.quantity > 0) { additemtocart(product._id, product.quantity) } }}>اضف الي طلباتي</button> */}

                          {/* {itemid.filter((i) => i == product._id).length > 0 && product.quantity > 0 ?
                            <button className='delete-item' onClick={() => { deleteitems(product._id); setitemid(itemid.filter((i) => i !== product._id)) }}>احذف من الطلبات</button>
                            : <button className='add-item' onClick={() => { if (product.quantity > 0) { additemtocart(product._id, product.quantity) }; setitemid([...itemid, product._id]) }}>اضف الي طلباتي</button>}  */}
                        </div>
                      </div>
                    </div>
                  )
                }
                )}
              </div>
              <div className='pos-cart'>
                  <div className="cart-wrapper">
                    <div className="title-text">
                      <div ref={ordersText} className="title order">
                        طلباتك الحالية
                      </div>
                      <div className="title invoice">
                        الفاتورة
                      </div>
                    </div>
                    <div className="cart-container">
                      <div className="slide-controler">
                        <input type="radio" name="slide" id="order-radio" defaultChecked />
                        <input type="radio" name="slide" id="invoice-radio" />
                        <label htmlFor="order-radio" className="slide order" onClick={() => {
                          orderside.current.style.marginRight = "0%";
                          ordersText.current.style.marginRight = "0%";
                        }}>طلباتك الحالية</label>
                        {userlogininfo ?
                          <label htmlFor="invoice-radio" className="slide invoice" onClick={() => {
                            invoice(userlogininfo.id);
                            orderside.current.style.marginRight = "-50%";
                            ordersText.current.style.marginRight = "-50%";
                          }}>الفاتورة</label> :
                          <label htmlFor="invoice-radio" className="slide invoice" onClick={() => {
                            invoice(id);
                            orderside.current.style.marginRight = "-50%";
                            ordersText.current.style.marginRight = "-50%";
                          }}>الفاتورة</label>}
                        <div className="slider-tab">

                        </div>
                      </div>
                      <div className="cart-inner">
                        <div ref={orderside} className="order side">
                          <div className='side-content'>
                            {itemsincart.map((i, index) => {
                              return (
                                i.quantity > 0 ?
                                  <div className="cart-item" key={index}>
                                    <div className="cart-img">
                                      <img src={`https://raw.githubusercontent.com/beshoynady/restaurant-api/main/server/images/${i.image}`} />
                                    </div>
                                    <div className='cart-det'>
                                      <div className="item-head">
                                        <p>{i.name}</p>
                                        <button onClick={() => deleteitems(i._id)}>حذف</button>
                                      </div>
                                      <div className="del-cost">
                                        <div className='cart-price'>
                                          <p>{i.price} ج</p>
                                          <p>×{i.quantity}</p>
                                        </div>
                                        <p>{i.price * i.quantity}</p>
                                      </div>
                                      {i.notes ? <div className='cart-note'>{i.notes}</div> : ''}
                                    </div>

                                  </div>
                                  : ''
                              )
                            })
                            }
                          </div>
                          <div className="total-order">

                            {userlogininfo ? <button className='total-order-btn' onClick={() => createclientorder(userlogininfo.id)}>تاكيد الطلب</button> : id ? <button className='total-order-btn' onClick={() => createclientorder(id)}>تاكيد الطلب</button>
                              : ''}

                            <div className='total-order-details'>
                              <h2>المجموع</h2>
                              <p>{costOrder}</p>
                            </div>
                          </div>
                        </div>
                        <div className="invoice side" >
                          <div ref={printContainer} className="side-content">
                            <table className="invoice-info-container">
                              <tbody>
                                <tr>
                                  <td rowSpan="2" className="client-name">
                                    عميل:{userlogininfo ? usertitle(userlogininfo.id) : ''}
                                  </td>
                                  <td rowSpan="2">
                                    كافيار
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Invoice Date: <strong>{orderupdate_date}</strong>
                                  </td>
                                  <td>
                                    Invoice No: <strong>{myorder.serial}</strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table className="line-items-container">
                              <thead>
                                <tr>
                                  <th className="bold heading-name">المنتج</th>
                                  <th className="bold heading-quantity">الكمية</th>
                                  <th className="bold heading-price">السعر</th>
                                  <th className="bold heading-subtotal">التكلفه</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list_produccts_order.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td className="bold heading-name">{item.name}</td>
                                      <td className="bold heading-quantity">{item.quantity}</td>
                                      <td className="bold heading-price">{item.price}</td>
                                      <td className="bold heading-subtotal">{item.totalprice}</td>
                                    </tr>
                                  )
                                })}


                              </tbody>
                            </table>

                            <table className="line-items-container has-bottom-border">
                              <thead>
                                <tr>
                                  {/* <th>Payment Info</th> */}
                                  <th>Due By</th>
                                  <th>Total Due</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="large">{orderupdate_date}</td>
                                  <td className="large total">{totalinvoice}</td>
                                </tr>
                              </tbody>

                            </table>
                            <div className="footer">
                              <div className="footer-info">
                                <span>hello@useanvil.com</span> |
                                <span>555 444 6666</span> |
                                <span>useanvil.com</span>
                              </div>
                              <div className="footer-thanks">
                                <img src="https://github.com/anvilco/html-pdf-invoice-template/raw/main/img/heart.png" alt="heart" />
                                <span>Thank you!</span>
                              </div>
                            </div>
                          </div>
                          <div className="total-order">
                            <button className='total-order-btn' onClick={() => checkout()}>طلب الحساب</button>
                            <button className='total-order-btn' onClick={handlePrint}>طباعه</button>
                            <div className='total-order-details'>
                              <h2>الاجمالي</h2>
                              <p>{totalinvoice}</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          )
        }
      }
    </detacontext.Consumer>

  )
}

export default POS