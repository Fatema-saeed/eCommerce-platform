import React , {useState , useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Row , Col , Button, Form  } from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import {register } from '../actions/userActions' 
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword ] = useState('')
    const [confirmPassword , setConfirmPassword ] = useState('')
    const [message, setMessage ] = useState(null)
    const [name , setName] = useState('')
    const location = useLocation()
    const navigate= useNavigate()
    const redirect =location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()

    const userRegister= useSelector(state=> state.userRegister)
    const {loading , error , userInfo} = userRegister 

    useEffect(()=>{
      if(userInfo){
       navigate(redirect)
      }
    },[navigate , redirect , userInfo])


    const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword){
        setMessage('Password do not match')
      }else{
        dispatch(register(name ,email , password))
      }      
    }


  return (
 
    <FormContainer>
      <h1>Sing Up </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=> setName(e.target.value) }
             ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=> setEmail(e.target.value) }
             ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=> setPassword(e.target.value) }
             ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value) }
             ></Form.Control>
        </Form.Group>

        
      <Button variant='primary' className='mt-3' type='submit'>Register</Button>
      </Form>
      <Row className='py-3'>
        <Col>
        Have An Account ? <Link to={redirect ?`/login?redirect=${redirect}` : '/login'}>
          Login
        </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen