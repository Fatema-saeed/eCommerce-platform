import React ,{ useEffect}from 'react'
import { Col, Row } from 'react-bootstrap'
// send of or dispach list products actions  
//useDispatch used to dispach and call an action 
//useSelector used to select parts of the state
import { useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const dispach = useDispatch()
// to display products 
  const productList=useSelector (state => state.productList)
  const {loading , error , products , page , pages} = productList
 
  useEffect(()=>{ 
    //firing off the action to get the products
    dispach(listProducts(keyword , pageNumber))
    
  },[dispach , keyword , pageNumber])
//if loading then show h2 else show the error  else show the products page 
  return (
    <>  
    <Meta/>
    {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>
          Go Back
        </Link> }
    <h1>Latest products</h1>
    {loading ? (<Loader/>): error ? (<Message variant='danger'>{error}</Message> ):
    <>
     <Row> 
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6}lg={4} xl={3} >
            <Product product={product}/>
            </Col>
        ))}
    </Row>
    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
    </>
     } 
    
    </>
  )
}

export default HomeScreen