import React,{useState} from 'react';
import './Menu-card.css';
import { detacontext } from '../../../../../App';

const MenuCard = () => {
   const [isadd, setisadd] = useState(false)
   const [noteArea, setnoteArea] = useState(false)
   const [productid, setproductid] = useState('')
   return (
      <detacontext.Consumer>
         {
            ({ allProducts, categoryid,itemsincart, additemtocart, deleteitems, increment, descrement,setproductnote,addnotrstoproduct, }) => {
               return (
                  <div className="card-group">
                     {allProducts.filter(pro => pro.category === categoryid).map((product, index) => {
                        return (
                           <div className="menu-card" key={index}>
                              <img className='img-card' src={`https://raw.githubusercontent.com/beshoynady/restaurant-api/main/server/images/${product.image}`} alt="" />
                              {product._id==productid&noteArea==true?<form onSubmit={(e)=>{addnotrstoproduct(e,product._id);;setnoteArea(!noteArea)}}>
                                    <textarea name="note" cols="100" rows="3" onChange={(e)=>{setproductnote(e.target.value)}}></textarea>
                                    <div className='note-btn'>
                                    <button>تاكيد</button>
                                    <button onClick={()=>setnoteArea(!noteArea)}>الغاء</button>
                                    </div>
                                 </form>:''}

                              <div className="detalis">
                                 <div className='product-det'>
                                    <div className='product-name'>
                                       <h2>{product.name}</h2>
                                       <span className="material-symbols-outlined" onClick={()=>{setnoteArea(!noteArea);setproductid(product._id)}}>note_alt</span>
                                    </div>
                                    <p>{product.description}</p>
                                 </div>
                                 <div className="price">
                                    <p>{product.price}ج</p>
                                    <div className="counter">
                                       <button className='symb' onClick={() => descrement(product._id)}>-</button>
                                       <span className='num'>{product.quantity}</span>
                                       <button className='symb' onClick={() => increment(product._id)}>+</button>
                                    </div>
                                 </div>
                                 <div className='card-btn'>
                                 {isadd == true ?
                              <button className='delfromcart' onClick={() => { if (product.quantity > 0) { deleteitems(product._id);setisadd(!isadd) } }}>احذف من الطلبات</button>
                              : <button className='addtocart' onClick={() => { if (product.quantity > 0) { additemtocart(product._id, product.quantity);setisadd(!isadd) } }}>اضف الي طلباتي</button>}
                                 </div>
                              </div>
                           </div>
                        )
                     }
                     )}
                  </div>
               )
            }
         }
      </detacontext.Consumer>

   )
}

export default MenuCard