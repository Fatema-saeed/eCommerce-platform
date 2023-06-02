import { 
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
   } 
    from "../constants/productConstants"
import axios from 'axios'    
import { logout } from './userActions'


//dispach actions into reduser , it works like useffect    
//action creator
export const listProducts = (keyword = '' , pageNumber = '') => async (dispach)=> {
    try{
        //calling the reducer and set loading to true 
         dispach({ type: PRODUCT_LIST_REQUEST })

         // making request , give as a data 
         const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

         dispach({ 
            type: PRODUCT_LIST_SUCCESS,
            //whent it successful  products will fialed with the payloaqd 
            payload: data
         })
    }catch (error){
        dispach({
            //if something went wrong 
            type:PRODUCT_LIST_FAIL,
            //the is give as the console errrr 
            payload : error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispach)=> {
    try{
        //calling the reducer and set loading to true 
         dispach({ type: PRODUCT_DETAILS_REQUEST })

         // making request , give as a data 
         const {data} = await axios.get (`/api/products/${id}`) 

         dispach({ 
            type: PRODUCT_DETAILS_SUCCESS,
            //whent it successful a single product will fialed with the payloaqd 
            payload: data
         })
    }catch (error){
        dispach({
            //if something went wrong 
            type:PRODUCT_DETAILS_FAIL,
            //the is give as the console errrr 
            payload : error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          
         await axios.delete(`/api/products/${id}`, config)
      
        dispatch({type: PRODUCT_DELETE_SUCCESS})  
        
    } catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload : error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
        })
    }
} 


export const createProduct = () => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          
        const {data} = await axios.post(`/api/products`,{}, config)
      
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload : data})  
        
    } catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload : error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
        })
    }
} 



export const updateProduct = (product) => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
            'Content-Type' :'application/json', 
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          
        const {data} = await axios.put(`/api/products/${product._id}`,product, config)
      
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload : data})  
        
    } catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload : error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
        })
    }
} 



export const createProductReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/products/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }
  
  export const listTopProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST })
  
      const { data } = await axios.get(`/api/products/top`)
  
      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }