import express from 'express'
import {
    deleteProduct,
    getProductById ,
    getProducts,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
    } from '../controllers/productController.js'
const router=express.Router()
import { protect  , admin} from '../middleware/authMiddleware.js'



// show the inteir products
// GET/api/products
router.route('/').get(getProducts).post(protect, admin , createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

router.get('/top', getTopProducts)


//show the product using the id
// GET/api/products/:id
// public =>no need to signup or signin
router.route('/:id').get(getProductById).delete(protect , admin , deleteProduct).put(protect , admin , updateProduct)


export default router