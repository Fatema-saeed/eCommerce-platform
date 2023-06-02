//next => moving to the next piece of middleware 

const notFound= (req,res,next)=>{
    //throw an error 
    //console.log(req.originalUrl) => show url api product 
    const error= new Error (`Not Found - ${req .originalUrl}`)
    //set the status to 404
    res.status(404)
    next(error)
}

//function to handel error
// this function will show a json data with the error message and the stack trace instead of html file
const errorHandler=(err,req,res,next)=>{
    //figure out  the status code 
    // 200 and 500 server errors 
    // if the server status is 200 so make it 500 else it gonna be whatever the statuse code is 
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // set res.status to whatever that status code is 
    res.status(statusCode)
    res.json({
        //message comes from the error object 
        message: err.message,
        //if NODE_ENV is equal to 'production' then make it null else i wanna get the stack from that object
        stack : process.env.NODE_ENV === 'production'? null : err.stack,
    })
}

export  {notFound , errorHandler }