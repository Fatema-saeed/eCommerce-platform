import mongoose from "mongoose";
import bcrypt from "bcryptjs"
 
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default:false
    }
}, {
    timestamps:true
})

userSchema.methods.matchPassword = async function (enterdPassword){
    return bcrypt.compare(enterdPassword , this.password)
}
//we wanna it to happen befor save the data
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        next()
    }
    //using salt to hash the password
    const salt =  await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password , salt)
})

const User= mongoose.model('User', userSchema)

export default User