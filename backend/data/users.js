import bcrypt from 'bcryptjs'

const users= [
    {
        name:'Admin user',
        email:'admin@exapmle.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Fatema Saeed',
        email:'fatema-saeed@exapmle.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Abeer Rasheed',
        email:'abeerasheed@exapmle.com',
        password:bcrypt.hashSync('123456',10),
    },
 
]
export default users