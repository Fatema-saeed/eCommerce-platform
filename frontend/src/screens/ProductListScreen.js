import React , { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button  , Row , Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch , useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts , deleteProduct , createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {
  const params = useParams()
  const pageNumber =params.pageNumber || 1
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const {products,loading , error , page , pages } = productList 

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin 

    const productDelete = useSelector(state => state.productDelete)
    const {success:successDelete ,loading: loadingDelete , error:errorDelete } = productDelete 

    const productCreate = useSelector(state => state.productCreate)
    const {success:successCreate ,loading: loadingCreate , error:errorCreate  , product :createdProduct } = productCreate 

    //passin successDelete into useeffect so when that happen (listProduct) this runs agian to have the deleted product gone 
    useEffect(()=>{
      dispatch({type : PRODUCT_CREATE_RESET })

      if (!userInfo.isAdmin ){
       navigate('/login')
      }

      if (successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProducts('', pageNumber))
      }
    },[dispatch , navigate, userInfo , successDelete , successCreate , createdProduct , pageNumber])

    const createProductHandler  = () =>{
        dispatch(createProduct())
    }


    const deleteHandler = (id) => {  
      if(window.confirm('Are You Sure ? ')){
        dispatch(deleteProduct(id))
      }

      }
  

    return (
        <>
         <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right' style={{marginLeft : 883}}>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          )}
        </>
      )
    }
export default ProductListScreen