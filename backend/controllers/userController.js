const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')


// to register new user
// route - POST method- /api/users
//access - public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    
    if(!name || !email || !password){
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({email})
    if(userExist){
        throw new Error('User already exist')
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        throw new Error('Invalid user data')
    }
})

// to login user
// route - POST method- /api/users/login
//access - public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        throw new Error('Invalid credentials')
    }

    
})

// to get user data
// route - GET method- /api/users/mp
//access - private
const getMP = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.json({
        id: _id,
        name,
        email
    })
})

//generate token (jwt)
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}


module.exports = { registerUser, loginUser, getMP }