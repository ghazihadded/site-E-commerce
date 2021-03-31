import React,{useEffect,Fragment, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Pagination from 'react-js-pagination'
import {getAllProducts} from '../../actions/productsAction'
import Product from './Product'
import Loader from'../layout/Loader'

 const HomePage = () => {
   
    const [page,setPage]=useState(1)
    const [limit]=useState(6)
   const {products,loading,totalProducts}=useSelector(state=>state.productReducer)
   
    const dispatch=useDispatch()

   useEffect(()=>{
       
      dispatch(getAllProducts({page,limit}))

   },[dispatch,page,limit])    

               
       if(loading){
           return (
           <Loader />
           )
               }
   
    return (
        <Fragment>
             <h1 id="products_heading">Latest Products</h1>
           <div className="col-6 col-md-9">
              <div className="row">
                   {products.map(product => (
                          <Product key={product._id} product={product} col={4} />
                              ))}
                    </div>
         </div>
         {products.length>0 && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={limit}
                                totalItemsCount={totalProducts}
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
    )
}

export default HomePage