import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'

const StockItem = () => {


  const [pagination, setpagination] = useState(5)
  const EditPagination = (e) => {
    if (e.target.innerHTML == 'Next') {
      setpagination(pagination + 5)
    } else if (e.target.innerHTML == 'Previous') {
      if (pagination <= 5) {
        setpagination(5)
      } else {
        setpagination(pagination - 5)
      }
    } else {
      setpagination(e.target.innerHTML * 5)
    }
  }


  const [itemName, setitemName] = useState("");
  const [unit, setunit] = useState('');
  const [openingBalance, setopeningBalance] = useState(0);
  const [price, setprice] = useState(0);
  const [createBy, setcreateBy] = useState("");
  const createAt = new Date()

  const createitem = async (e) => {
    e.preventDefault();
    try {

      const formdata = new FormData();
      formdata.append('itemName', itemName);
      formdata.append('unit', unit);
      formdata.append('openingBalance', openingBalance);
      formdata.append('price', price);
      formdata.append('createBy', createBy);
      formdata.append('createAt', createAt);
      console.log(...formdata)
      const response = await axios.post('https://restaurant-api-blush.vercel.app/api/stockitem/', formdata);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const [StockItemid, setStockItemid] = useState("")

  const editStockItem = async (e) => {
    e.preventDefault()
    if (createBy) {
      try {
        const response = await axios.put('https://restaurant-api-blush.vercel.app/api/StockItem/' + StockItemid, {
          itemName, unit, openingBalance, price, StockItemdiscount, image: createBy
        });
        console.log(response.data);
        if (response) {
          getallCategories()
          getallStockItems()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await axios.put('https://restaurant-api-blush.vercel.app/api/StockItem/withoutimage/' + StockItemid, {
          itemName, unit, openingBalance, price, StockItemdiscount
        });
        // console.log(StockItemid);
        console.log(response.data);
        if (response) {
          getallCategories()
          getallStockItems()
        }
      } catch (error) {
        console.log(error)
      }
    }

  }


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

  const deleteStockItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://restaurant-api-blush.vercel.app/api/StockItem/${StockItemid}`);
      if (response) {
        console.log(response);
        getallStockItems();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallStockItem()
    // getallCategories()
  }, [])

  return (
    <div className="container-xl mlr-auto">
      <div className="table-responsive mt-1">
        <div className="table-wrapper p-3 mw-100">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>ادارة <b>المنتجات</b></h2>
              </div>
              <div className="col-sm-6">
                <a href="#addStockItemModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>اضافه منتج جديد</span></a>

                <a href="#deleteStockItemModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>حذف</span></a>
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
                <th>الوحدة</th>
                <th>رصيد افتتاحي</th>
                <th>السعر</th>
                <th>الرصيد الحالي</th>
                <th>اجمالي التكلفة</th>
                <th>تاريخ الاضافه</th>
                <th>اضيف بواسطه</th>
                <th>اجراءات</th>
              </tr>
            </thead>
            <tbody>
              {AllStockItems && AllStockItems.map((item, i) => {
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
                      <td>{item.itemName}</td>
                      <td>{item.unit}</td>
                      <td>{item.openingBalance}</td>
                      <td>{item.price}</td>
                      <td>{item.balance}</td>
                      <td>{item.cost}</td>
                      <td>{item.createAt}</td>
                      <td>{item.createBy}</td>
                      {/* <td>
                        <a href="#editStockItemModal" className="edit" data-toggle="modal" onClick={() => { setStockItemid(p._id); setitemName(p.name); setopeningBalance(p.description); setunit(p.price); setStockItemdiscount(p.discount); setprice(p.category) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteStockItemModal" className="delete" data-toggle="modal" onClick={() => setStockItemid(p._id)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                      </td> */}
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">المعروض <b>{AllStockItems.length > pagination ? pagination : AllStockItems.length}</b> من <b>{AllStockItems.length}</b> الكل</div>
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
      <div id="addStockItemModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={createitem}>
              <div className="modal-header">
                <h4 className="modal-title">اضافه صنف</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>اسم الصنف</label>
                  <input type="text" className="form-control" required onChange={(e) => setitemName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>الوحدة</label>
                  <textarea className="form-control" required onChange={(e) => setunit(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>رصيد افتتاحي</label>
                  <input type='Number' className="form-control" required onChange={(e) => setopeningBalance(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>السعر</label>
                  <input type='Number' className="form-control" required onChange={(e) => setprice(e.target.value)} />
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
      {/* <div id="editStockItemModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={editStockItem}>
              <div className="modal-header">
                <h4 className="modal-title">تعديل منتج</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>الاسم</label>
                  <input type="text" className="form-control" defaultValue={AllStockItems.filter(p => p._id == StockItemid).length > 0 ? AllStockItems.filter(p => p._id == StockItemid)[0].name : ""} required onChange={(e) => setitemName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>الوصف</label>
                  <textarea className="form-control" defaultValue={AllStockItems.filter(p => p._id == StockItemid).length > 0 ? AllStockItems.filter(p => p._id == StockItemid)[0].description : ""} required onChange={(e) => setopeningBalance(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>السعر</label>
                  <input type='Number' className="form-control" defaultValue={AllStockItems.filter(p => p._id == StockItemid).length > 0 ? AllStockItems.filter(p => p._id == StockItemid)[0].price : ""} required onChange={(e) => setunit(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>التخفيض</label>
                  <input type='Number' className="form-control" defaultValue={AllStockItems.filter(p => p._id == StockItemid).length > 0 ? AllStockItems.filter(p => p._id == StockItemid)[0].discount : ""} required onChange={(e) => setStockItemdiscount(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>التصنيف</label>
                  <select name="category" id="category" form="carform" defaultValue={AllStockItems.filter(p => p._id == StockItemid).length > 0 ? AllStockItems.filter(p => p._id == StockItemid)[0].category : ""} onChange={(e) => setprice(e.target.value)}>
                    {listofcategories.map((category, i) => {
                      return <option value={category._id} key={i} >{category.name}</option>
                    })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>الصورة</label>
                  <input type="file" className="form-control" onChange={(e) => setcreateBy(e.target.files[0])} />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-danger" data-dismiss="modal" value="إغلاق" />
                <input type="submit" className="btn btn-info" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="deleteStockItemModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={deleteStockItem}>
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
      </div> */}
    </div>
  )
}

export default StockItem