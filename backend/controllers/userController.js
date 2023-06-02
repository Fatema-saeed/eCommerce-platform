import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from '../models/userModel.js'

// Auth user & get token 
//public 
// POST /api/users/login
const authUser = asyncHandler ( async (req , res)=> {
    const {email , password }= req.body
    //find the if there is a same email 
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id : user._id , 
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id),
        })
    }else {
        res.status(401)
        throw new Error ('Invalid email or password')
    }
  
})
// register a new user 
//public 
// POST /api/users
const registerUser = asyncHandler ( async (req , res)=> {
    const {name ,email , password }= req.body
    //find the if there is a same email 
    const userExsits = await User.findOne({email})
    if (userExsits){
        res.status(400)
        throw new Error ('User already exsits ')
    }
    const user = await User.create({
        name,
        email,
        password,
    })
    if ( user ){
        res.status(201).json({
            _id : user._id , 
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error ('Invailed user data')
    } 
})


// get user profile
//privet 
// POST /api/users/profile
const getUserProfile  = asyncHandler ( async (req , res)=> {
    const user = await User.findById(req.user._id )
    if(user){
        res.json({
            _id : user._id , 
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error ('User not found')
    }
  
})


// update user profile
//privet 
// PUT /api/users/profile
const updateUserProfile  = asyncHandler ( async (req , res)=> {
    const user = await User.findById(req.user._id )
    if(user){
     user.name = req.body.name || user.name
     user.email = req.body.email || user.email
     if (req.body.password){
        user.password = req.body.password 
     }
     const updatedUser = await user.save()
     res.json({
            _id : updatedUser._id , 
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : generateToken(updatedUser._id),
        })
    }else{
        res.status(404)
        throw new Error ('User not found')
    }
  
})

// GET /api/users
// get all users
// privet/Admin
const getUsers = asyncHandler ( async (req , res)=> {
    const users = await User.find({})
    res.json(users)
}) 


// DELETE  /api/users/:id
// delet a user 
// privet/Admin
const deleteUser = asyncHandler ( async (req , res)=> {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message : 'User Removed'})

    }else{
        res.status(404)
        throw new Error ('User no found')
    }
}) 


// GET /api/users/:id
// get user by id
// privet/Admin
const getUserById = asyncHandler ( async (req , res)=> {
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error ('User no found')

    }
    
}) 



// update user 
//privet/admin
// PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  


export { 
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
    }