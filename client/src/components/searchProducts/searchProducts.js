import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import Product from "../homePage/Product";
import Loader from "../layout/Loader";
import { getSearchProducts } from "../../actions/productsAction";
import Pagination from 'react-js-pagination'
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const filterProducts = (e,type,products,price) => {
       
    if(type==="category"){
    return products.filter(p=>p.category===e)
   }else if(type==="ratings"){
    return products.filter(p=>p.ratings >= e)
   }else if(type==="price") {
  
    return products.filter(p=> p.price>=price[0]&&p.price<=price[1] )
   }else{
       return products
   }
  };

const SearchProducts = ({ match }) => {
  const [page,setPage]=useState(1)
  const [type, setType] = useState("");
  const [price, setPrice] = useState([1, 1000])
  const [value,setValue]= useState('')
  const { productsSearch, loading } = useSelector(
    (state) => state.productsSearch
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchProducts(match.params.search));
  }, [dispatch, match.params.search]);
  
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

 
 let products= filterProducts(value,type,productsSearch,price)
 const productOfPage=(page-1)*3
 const displayProducts=products.slice(productOfPage,productOfPage+3)
 const filterPrice= async(start)=>{
  setPage(1);
    setPrice(start)
    setType("price")
    
    }
 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {productsSearch.length  && (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={filterPrice}
                        
                        
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              onClick={async() => {
                                setPage(1);
                                setType("category");
                                setValue(category)
                              }}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={async() => {
                                setPage(1);
                                setType("ratings");
                                setValue(star)
                              }}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {displayProducts.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </section>
        </Fragment>
      )}
      
      { productsSearch.length && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={3}
                                totalItemsCount={products.length}
                                onChange={(number)=> setPage(number)}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                        )}
    </Fragment>
  );
};

export default SearchProducts;
