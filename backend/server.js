import express from 'express'
import connectDB from './config/db.js'
import path from 'path'
import colors from 'colors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js '
import morgan from 'morgan'
// middelware is a function that has an access to the (req, res) sycle
dotenv.config()

connectDB()

const app=express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

app.use(express.json())

app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal' , (req , res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(notFound)

app.use(errorHandler)

app.get('/', (req,res)=>{
    res.send('API is running....')
})


const PORT=process.env.PORT||5000
app.listen(PORT ,console.log(`Server runnig in ${process.env.NODE_ENV } on port ${ PORT}`.yellow.bold))