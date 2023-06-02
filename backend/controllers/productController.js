//asyncHandler used instead of try and catch errors 
import asyncHandler from "express-async-handler"
import Product from '../models/productModel.js'



// show the inteir products
// GET/api/products
// public => no need to signup or signin
const getProducts = asyncHandler ( async (req , res)=> {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name : {
      $regex : req.query.keyword ,
      $options : 'i'
    }
  } :{}
    //this const contain all products couse we have an empty { }
    //when we use mongoose methods it returns a promise so we shuold use async and await

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


//show the product using the id
// GET/api/products/:id
// public =>no need to signup or signin
const  getProductById = asyncHandler (async (req , res )=>{
    //for each product we wanna take product id is equal to what ever in url id
    const product= await Product.findById(req.params.id)
    //check the products => if there is a products then return all if isnt the send an error massage
    if (product){
        res.json(product)
    }else{
        //error massage
        //404 is not found
        res.status(404)
        throw new Error ('Product not found')
    }

})


// delete product
// DELETE /api/products/:id
// privet/Admin
const  deleteProduct = asyncHandler (async (req , res )=>{
    const product = await Product.findById(req.params.id)
    if (product){
        await product.remove()
        res.json({message : 'Product Removed' })
    }else{
        //error massage
        //404 is not found
        res.status(404)
        throw new Error ('Product not found')
    }

})


// Create a product 
// POST /api/products
// privet/Admin
const  createProduct = asyncHandler (async (req , res )=>{
   const product = new Product ({
    name : 'Sample name ' ,
    price : 0 ,
    user : req.user._id,
    image : '/images/sample.jpg',
    brand : 'Sample brand' ,
    category : 'Sample category' ,
    countInStock : 0 ,
    numReviews : 0 , 
    description : 'Sample description '
   })
   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})



// Update a product 
// PUt /api/products/:id
// privet/Admin
const  updateProduct = asyncHandler (async (req , res )=>{
    const {
        name,
        price ,
        description ,
        category ,
        image ,
        brand,
        countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if (product){
        product.name = name
        product.price = price
        product.description = description
        product.cacategory =category
        product.image = image
        product.brand =brand
        product.cocountInStock =countInStock
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    } 
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
 })

 // @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
 
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})




export {
    getProductById ,
    getProducts,
    deleteProduct ,
    createProduct,
    updateProduct, 
    createProductReview,
    getTopProducts
}