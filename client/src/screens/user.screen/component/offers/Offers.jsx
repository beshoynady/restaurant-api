import React, { useRef, useState } from 'react';
import { detacontext } from '../../../../App'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Offers.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Offers() {
  const [noteArea, setnoteArea] = useState(false)
  const [productid, setproductid] = useState('')
  return (
    <detacontext.Consumer>
      {
        ({ allProducts, itemsincart, additemtocart, deleteitems, increment, descrement, setproductnote, addnotrstoproduct, }) => {
          return (
            <section className='offers-section'>
              <div className='section-title'>
                <h2>OFFERS</h2>
              </div>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {allProducts.filter(pro => pro.discount > 0).map((product, index) => {
                  return (
                    <SwiperSlide>
                      <div className="offer-card" key={index}>
                        <img className='offer-img' src={`https://raw.githubusercontent.com/beshoynady/restaurant-api/main/server/images/${product.image}`} alt="" />
                        {product._id == productid & noteArea == true ?
                          <div className='offers-note'>
                            <form onSubmit={(e) => { addnotrstoproduct(e, product._id);; setnoteArea(!noteArea) }}>
                              <textarea name="note" cols="100" rows="3" onChange={(e) => { setproductnote(e.target.value) }}></textarea>
                              <div className='note-btn'>
                                <button>تاكيد</button>
                                <button onClick={() => setnoteArea(!noteArea)}>الغاء</button>
                              </div>
                            </form>
                          </div>
                          : ''}

                        <div className="offer-detalis">
                          <div className='offer-info'>
                            <div className='p-info'>
                              <h2 className='p-name'>{product.name}</h2>
                              <span className="material-symbols-outlined note-icon" onClick={() => { setnoteArea(!noteArea); setproductid(product._id) }}>note_alt</span>
                            </div>
                            <div className='offer-description'>{product.description}</div>
                          </div>
                          <div className="offer-price">
                            <div className="p-counter">
                              <button className='counter-symb' onClick={() => descrement(product._id)}>-</button>
                              <div className='counter-num'>{product.quantity}</div>
                              <button className='counter-symb' onClick={() => increment(product._id)}>+</button>
                            </div>
                            <div className='p-price'>{product.price - product.discount}ج <span>{product.price}</span></div>
                          </div>
                          <div className='offer-card-btn'>
                            {console.log(itemsincart)} {console.log(itemsincart.filter((pr) => pr._id == product._name))}
                            {itemsincart.filter((pr) => pr._id == product._name) ?
                              <button className='delcart' onClick={() => { deleteitems(product._id) }}>احذف من الطلبات</button>
                              : <button className='addtocart' onClick={() => { if (product.quantity > 0) { additemtocart(product._id, product.quantity) } }}>اضف الي طلباتي</button>}
                          </div>
                        </div>
                      </div>

                    </SwiperSlide>
                  )
                }
                )}
                {/* <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide> */}
              </Swiper>
            </section>
          )
        }
      }
    </detacontext.Consumer>
  );

}
