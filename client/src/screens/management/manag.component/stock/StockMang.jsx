import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'

const Products = () => {


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


  const [productname, setproductname] = useState("");
  const [productprice, setproductprice] = useState(0);
  const [productdescription, setproductdescription] = useState("");
  const [productcategoryid, setproductcategoryid] = useState(null);
  const [productimg, setproductimg] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('productname', productname);
      formdata.append('productprice', productprice);
      formdata.append('productdescription', productdescription);
      formdata.append('productcategoryid', productcategoryid);
      formdata.append('image', productimg);
      console.log(...formdata)
      const response = await axios.post('https://restaurant-api-blush.vercel.app/api/product/', formdata);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const [productid, setproductid] = useState("")
  const [productdiscount, setproductdiscount] = useState(null)

  const editProduct = async (e) => {
    e.preventDefault()
    if (productimg) {
      try {
        const response = await axios.put('https://restaurant-api-blush.vercel.app/api/product/' + productid, {
          productname, productprice, productdescription, productcategoryid, productdiscount, image: productimg
        });
        console.log(response.data);
        if (response) {
          getallCategories()
          getallproducts()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await axios.put('https://restaurant-api-blush.vercel.app/api/product/withoutimage/' + productid, {
          productname, productprice, productdescription, productcategoryid, productdiscount
        });
        // console.log(productid);
        console.log(response.data);
        if (response) {
          getallCategories()
          getallproducts()
        }
      } catch (error) {
        console.log(error)
      }
    }

  }


  const [listofProducts, setlistofProducts] = useState([]);

  const getallproducts = async () => {
    try {
      const response = await axios.get('https://restaurant-api-blush.vercel.app/api/product/');
      const products = await response.data;
      // console.log(response.data)
      setlistofProducts(products)
      // console.log(listofProducts)

    } catch (error) {
      console.log(error)
    }

  }

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://restaurant-api-blush.vercel.app/api/product/${productid}`);
      if (response) {
        console.log(response);
        getallproducts();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [listofcategories, setlistofcategories] = useState([])
  const getallCategories = async () => {
    try {
      const response = await axios.get('https://restaurant-api-blush.vercel.app/api/category/');
      const categories = await response.data;
      // console.log(response.data)
      setlistofcategories(categories)
      // console.log(listofcategories)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getallproducts()
    getallCategories()
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
                <a href="#addProductModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>اضافه منتج جديد</span></a>

                <a href="#deleteProductModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>حذف</span></a>
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
                <th>الصورة</th>
                <th>الاسم</th>
                <th>الوصف</th>
                <th>التصنيف</th>
                <th>السعر</th>
                <th>التخفيض</th>
                <th>عدد المبيعات</th>
                <th>اجراءات</th>
              </tr>
            </thead>
            <tbody>
              {listofProducts && listofProducts.map((p, i) => {
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
                      <td><img src={`https://raw.githubusercontent.com/beshoynady/restaurant-api/main/server/images/${p.image}`} style={{ "width": "60px", "height": "50px" }} /></td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{listofcategories.length > 0 ? listofcategories.find(c => c._id == p.category).name : ""}</td>
                      <td>{p.price}</td>
                      <td>{p.discount}</td>
                      <td>{p.sales}</td>
                      <td>
                        <a href="#editProductModal" className="edit" data-toggle="modal" onClick={() => { setproductid(p._id); setproductname(p.name); setproductdescription(p.description); setproductprice(p.price); setproductdiscount(p.discount); setproductcategoryid(p.category) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteProductModal" className="delete" data-toggle="modal" onClick={() => setproductid(p._id)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">المعروض <b>{listofProducts.length > pagination ? pagination : listofProducts.length}</b> من <b>{listofProducts.length}</b> الكل</div>
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
      <div id="addProductModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={createProduct}>
              <div className="modal-header">
                <h4 className="modal-title">اضافه منتج</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>الاسم</label>
                  <input type="text" className="form-control" required onChange={(e) => setproductname(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>الوصف</label>
                  <textarea className="form-control" required onChange={(e) => setproductdescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>السعر</label>
                  <input type='Number' className="form-control" required onChange={(e) => setproductprice(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>التصنيف</label>
                  <select name="category" id="category" form="carform" onChange={(e) => setproductcategoryid(e.target.value)}>
                    {listofcategories.map((category, i) => {
                      return <option value={category._id} key={i} >{category.name}</option>
                    })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>الصورة</label>
                  <input type="file" className="form-control" required onChange={(e) => setproductimg(e.target.files[0])} />
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
      <div id="editProductModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={editProduct}>
              <div className="modal-header">
                <h4 className="modal-title">تعديل منتج</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>الاسم</label>
                  <input type="text" className="form-control" defaultValue={listofProducts.filter(p => p._id == productid).length > 0 ? listofProducts.filter(p => p._id == productid)[0].name : ""} required onChange={(e) => setproductname(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>الوصف</label>
                  <textarea className="form-control" defaultValue={listofProducts.filter(p => p._id == productid).length > 0 ? listofProducts.filter(p => p._id == productid)[0].description : ""} required onChange={(e) => setproductdescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>السعر</label>
                  <input type='Number' className="form-control" defaultValue={listofProducts.filter(p => p._id == productid).length > 0 ? listofProducts.filter(p => p._id == productid)[0].price : ""} required onChange={(e) => setproductprice(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>التخفيض</label>
                  <input type='Number' className="form-control" defaultValue={listofProducts.filter(p => p._id == productid).length > 0 ? listofProducts.filter(p => p._id == productid)[0].discount : ""} required onChange={(e) => setproductdiscount(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>التصنيف</label>
                  <select name="category" id="category" form="carform" defaultValue={listofProducts.filter(p => p._id == productid).length > 0 ? listofProducts.filter(p => p._id == productid)[0].category : ""} onChange={(e) => setproductcategoryid(e.target.value)}>
                    {listofcategories.map((category, i) => {
                      return <option value={category._id} key={i} >{category.name}</option>
                    })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>الصورة</label>
                  <input type="file" className="form-control" onChange={(e) => setproductimg(e.target.files[0])} />
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
      <div id="deleteProductModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={deleteProduct}>
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

export default Products