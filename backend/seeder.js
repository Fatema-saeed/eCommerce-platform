import mongoose from "mongoose"
import dotenv from 'dotenv'
import colors from 'colors'
import users from "./data/users.js"
import products  from "./data/products.js"
import User from "./models/userModel.js"
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
dotenv.config()

connectDB()

const importData= async()=>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        
        const createdUsers=await User.insertMany(users)
        //first iteme then we want the id field
        const adminUser= createdUsers[0]._id

        //map through products and add the admin user to each one 
        const sampleProducts= products.map( product =>{
            //use the spread operator which will spread across all of the data that's already there =>{...}
            // add to the user field the adminUser
            return {...product,user:adminUser}
        })
        //insert the products data including the adminUser
        await Product.insertMany(sampleProducts)
        console.log('data imported '.green.inverse)
        process.exit()
    }catch{
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const detroyData= async()=>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
    
        console.log('data destroyed '.red.inverse)
        process.exit()
    }catch (error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}
// if we passed in   -d in console at index 2 the destroydata function will run
if (process.argv [2]=== '-d'){
    detroyData()
}else{
    importData()
}