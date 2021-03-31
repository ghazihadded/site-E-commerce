import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "./SideBar";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import {newProduct} from '../../actions/productsAction'


const CreateProduct = ({ history }) => {
    
     const {succes}=useSelector(state=>state.productReducer ) 
    const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: 0,
    seller: "",
  });

  const [upload, setUpload] = useState([]);
  const alert=useAlert()

  const [imagesPreview,setImagesPreview]=useState([])

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Healths",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    
    
     if(succes){
       alert.success('Product created successfully')
         history.push('/')
     }

     setForm({ ...form, category: "Electronics" })
     return ()=>{
         dispatch({
             type:"CLEAR_SUCCES"
         })
     }

  }, [dispatch,succes,history]);

  const handlerSubmit= async(e) => {
    e.preventDefault();
     
    let images=[]
     async function prodCreate(){
         
        for(let i=0;i<upload.length;i++){
            const formData = new FormData();
                 formData.append("profileImg",upload[i]);
                 const res = await axios.post(
                   "http://localhost:4000/api/user-profile",
                   formData
                 );
                 images=[...images,{public_id:Date.now(),url:res.data.imgCreated.profileImg}]
           }
     }
    
      
   await prodCreate()
   
   
   dispatch(newProduct({...form,images:images}))
   
   
  };

  const onChangeFrom = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([])
    setUpload([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          
            setImagesPreview(oldArray => [...oldArray, reader.result])
        }
      };

      reader.readAsDataURL(file);
      setUpload(f=> [...f,file])
    });
  };

 

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" encType="multipart/form-data" onSubmit={handlerSubmit}>
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name_field"
                    className="form-control"
                    value={form.name}
                    onChange={onChangeFrom}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price_field"
                    className="form-control"
                    value={form.price}
                    onChange={onChangeFrom}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description_field"
                    rows="8"
                    value={form.description}
                    onChange={onChangeFrom }
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    id="category_field"
                    value={form.category}
                    onChange={onChangeFrom}
                  
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    id="stock_field"
                    className="form-control"
                    value={form.stock}
                    onChange={onChangeFrom }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    name="seller"
                    id="seller_field"
                    className="form-control"
                    value={form.seller}
                    onChange={onChangeFrom }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                      required
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateProduct;
