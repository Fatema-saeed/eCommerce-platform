import React , {useEffect }from 'react'
import { useParams , useNavigate ,useLocation} from 'react-router-dom'
import Message from '../components/Message'
import { Row , Col , Button , Image , ListGroup ,Card , Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart , removeFromCart} from '../actions/cartActions'

//we are looping throu all the cart items and we calling each one item then we are acsseing diffrent fields 
const CartScreen = () => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productId = params.id
  
  // what ever after ? in url will be saved here
  //split ?qty=(number) after the (=) [?qty] will be the first index and [number] will be the second [?qty , number]
  // i'll get the 1 index
  //else the qty will be 1
  const qty = location.search ? Number(location.search.split('=')[1]): 1
  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart
  

  
  const removeFromCartHandler = (id )=> {
    dispatch( removeFromCart(id))
  }

  

  useEffect (()=>{
    //if productId is true then sent it to add to cart with qty
    if (productId){
      dispatch(addToCart(productId, qty))
      console.log('done')
    }
  },[dispatch, productId, qty])
  //console.log(qty)

  const checkoutHandler = () =>{
    navigate('/shipping')
  }
  

 
  return ( 
  <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? ( <Message>Your cart is empty <Link to ='/'>Go Back</Link></Message> ) : (
        <ListGroup variant= 'flush'>
          {cartItems.map((item) => (
            <ListGroup.Item key = {item.product}>
              <Row>
                <Col md={2}>
                  <Image src = {item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3} >
                  <Link to = {`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                <Form.Select 
                                 as='select'
                                 value={item.qty}
                                 onChange = {(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                    {
                                    [...Array(item.countInStock).keys()].map((x) => (
                                        <option key ={x + 1} value={x + 1} >
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}> 
                  <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          </ListGroup>
      )}  
    </Col>
    
    <Col md={4}>
      <Card variant='flush'>
        <ListGroup>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc , item)=> acc + item.qty , 0 )}) items </h2>
            ${cartItems.reduce((acc , item )=> acc + item.qty * item.price , 0 ).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button type='button'  className='btn-block' disabled={cartItems.length === 0 } onClick={checkoutHandler}>
              Proceed To Checkout</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  )
}

export default CartScreen