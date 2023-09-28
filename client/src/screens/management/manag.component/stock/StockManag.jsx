import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { detacontext } from '../../../../App'
const StockManag = () => {


  const [AllStockItems, setAllStockItems] = useState([]);

  const getallStockItem = async () => {
    try {
      const response = await axios.get('https://restaurant-api-blush.vercel.app/api/stockitem/');
      const StockItems = await response.data;
      console.log(response.data)
      setAllStockItems(StockItems)

    } catch (error) {
      console.log(error)
    }

  }

  const Stockstatus = ['مشتريات', 'منصرف', 'راجع']
  
  const [actionId, setactionId] = useState("")
  const [status, setstatus] = useState('');
  const [itemId, setitemId] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [price, setprice] = useState(0);

  const unit =itemId?AllStockItems.filter(stock => stock._id == itemId).unit:'';
  const cost =itemId?price * Quantity:0 ;
  const oldCost = itemId?AllStockItems.filter(stock => stock._id == itemId).const:''
  const newBalance = status=='منصرف'? oldCost - Quantity : oldCost+Quantity

  const createStockaction = async (e, userid) => {
    e.preventDefault();
    try {
      const actionAt = new Date()
      const actionBy = userid;
      const response = await axios.post('https://restaurant-api-blush.vercel.app/api/stockmanag/', { itemId, unit,Quantity, price,cost, status,actionBy, actionAt ,newBalance});
      console.log(response.data);
      getallStockaction()
    } catch (error) {
      console.log(error)
    }
  }


  // const editStockaction = async (e,userid) => {
  //   e.preventDefault()
  //   const createBy = userid
  //     try {
  //       const response = await axios.put('https://restaurant-api-blush.vercel.app/api/stockmang/' + actionId, {
  //         item, unit, openingBalance, price, createBy
  //       });
  //       console.log(response.data);
  //       if (response) {
  //         getallStockaction()
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
    

  // }


  const [AllStockactions, setAllStockactions] = useState([]);

  const getallStockaction = async () => {
    try {
      const response = await axios.get('https://restaurant-api-blush.vercel.app/api/stockmang/');
      const Stockactions = await response.data;
      console.log(response.data)
      setAllStockactions(Stockactions)

    } catch (error) {
      console.log(error)
    }

  }

  const deleteStockaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://restaurant-api-blush.vercel.app/api/stockmang/${actionId}`);
      if (response) {
        console.log(response);
        getallStockaction();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallStockItem()
    getallStockaction()
  }, [])
  return (
    <detacontext.Consumer>
      {
        ({ userlogininfo, usertitle, EditPagination,pagination }) => {
          return (
            <div className="container-xl mlr-auto">
              <div className="table-responsive mt-1">
                <div className="table-wrapper p-3 mw-100">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-6">
                        <h2>ادارة <b>المخزون</b></h2>
                      </div>
                      <div className="col-sm-6">
                        <a href="#addStockactionModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>اضافه منتج جديد</span></a>

                        <a href="#deleteStockactionModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>حذف</span></a>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>
                          <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll"></label>
                          </span>
                        </th>
                        <th>م</th>
                        <th>اسم الصنف</th>
                        <th>الكمية</th>
                        <th>الوحدة</th>
                        <th>الحالة</th>
                        <th>السعر</th>
                        <th>الثمن</th>
                        <th>الرصيد</th>
                        <th>الرصيد الجديد</th>
                        <th>تاريخ الحركه</th>
                        <th>تم بواسطه</th>
                        <th>اجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllStockactions && AllStockactions.map((action, i) => {
                        if (i < pagination & i >= pagination - 5) {
                          return (
                            <tr key={i}>
                              <td>
                                <span className="custom-checkbox">
                                  <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                  <label htmlFor="checkbox1"></label>
                                </span>
                              </td>
                              <td>{i + 1}</td>
                              <td>{action.item}</td>
                              <td>{action.Quantity}</td>
                              <td>{action.unit}</td>
                              <td>{action.status}</td>
                              <td>{action.price}</td>
                              <td>{action.cost}</td>
                              <td>{action.balance}</td>
                              <td>{action.actionAt}</td>
                              <td>{usertitle(action.actionBy)}</td>
                              <td>
                                <a href="#editStockactionModal" className="edit" data-toggle="modal" onClick={() => { setactionId(action._id)}}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteStockactionModal" className="delete" data-toggle="modal" onClick={() => setactionId(action._id)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                              </td>
                            </tr>
                          )
                        }
                      })}
                    </tbody>
                  </table>
                  <div className="clearfix">
                    <div className="hint-text">المعروض <b>{AllStockactions.length > pagination ? pagination : AllStockactions.length}</b> من <b>{AllStockactions.length}</b> الكل</div>
                    <ul className="pagination">
                      <li onClick={EditPagination} className="page-item disabled"><a href="#">Previous</a></li>
                      <li onClick={EditPagination} className="page-item"><a href="#" className="page-link">1</a></li>
                      <li onClick={EditPagination} className="page-item"><a href="#" className="page-link">2</a></li>
                      <li onClick={EditPagination} className="page-item active"><a href="#" className="page-link">3</a></li>
                      <li onClick={EditPagination} className="page-item"><a href="#" className="page-link">4</a></li>
                      <li onClick={EditPagination} className="page-item"><a href="#" className="page-link">5</a></li>
                      <li onClick={EditPagination} className="page-item"><a href="#" className="page-link">Next</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="addStockactionModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={(e) => createStockaction(e, userlogininfo.id)}>
                      <div className="modal-header">
                        <h4 className="modal-title">اضافه صنف بالمخزن</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <select name="" id="" onSelect={(e)=>setstatus(e.target.value)}>
                            {Stockstatus.map((statu,i)=>{
                              return <option key={i} defaultValue={statu[i]}>{statu[i]}</option>
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <select name="" id="" onSelect={(e)=>setitemId(e.target.value)}>
                            {AllStockItems.map((item,i)=>{
                              return <option key={i} defaultValue={item.itemName}>{item.itemName}</option>
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>الكمية</label>
                          <input type='Number' className="form-control" required onChange={(e) => setQuantity(e.target.value)} />
                          <input type='text' className="form-control"defaultValue={unit} readOnly required></input>
                        </div>
                        {/* <div className="form-group">
                          <label>الوحدة</label>
                        </div> */}
                        <div className="form-group">
                          <label>السعر</label>
                          <input type='Number' className="form-control" required onChange={(e) => setprice(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>التكلفة</label>
                          <input type='Number' readOnly className="form-control" defaultValue={cost} />
                        </div>
                        <div className="form-group">
                          <label>الرصيد الجديد</label>
                          <input type='Number' className="form-control" required defaultValue={newBalance} />
                        </div>
                        <div className="form-group">
                          <label>التاريخ</label>
                          <input type='date' className="form-control" defaultValue={new Date()} required readOnly />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-danger" data-dismiss="modal" value="إغلاق" />
                        <input type="submit" className="btn btn-success" value="اضافه" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div id="editStockactionModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={(e)=>editStockaction(e,userlogininfo.id)}>
                      <div className="modal-header">
                        <h4 className="modal-title">تعديل صنف بالمخزن</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>اسم الصنف</label>
                          <input type="text" className="form-control" defaultValue={item} required onChange={(e) => setitem(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>الوحدة</label>
                          <input type='text' className="form-control" defaultValue={unit} required onChange={(e) => setunit(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                          <label>رصيد افتتاحي</label>
                          <input type='Number' className="form-control" defaultValue={openingBalance} required onChange={(e) => setopeningBalance(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>السعر</label>
                          <input type='Number' className="form-control" defaultValue={price} required onChange={(e) => setprice(e.target.value)} />
                        </div>

                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-danger" data-dismiss="modal" value="إغلاق" />
                        <input type="submit" className="btn btn-info" value="Save" />
                      </div>
                    </form>
                  </div>
                </div>
              </div> */}

              <div id="deleteStockactionModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={deleteStockaction}>
                      <div className="modal-header">
                        <h4 className="modal-title">حذف منتج</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div className="modal-body">
                        <p>هل انت متاكد من حذف هذا السجل؟</p>
                        <p className="text-warning"><small>لا يمكن الرجوع في هذا الاجراء.</small></p>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-danger" data-dismiss="modal" value="إغلاق" />
                        <input type="submit" className="btn btn-danger" value="حذف" />
                      </div>
                    </form>
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

export default StockManag