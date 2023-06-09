const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   /api/users
// @access  (Token/Auth) public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields.')
    }

    // Find if user already exists
    const userExists = await User.findOne({ email }).exec()
    
    if(userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({ name, email, password: hashedPassword }) 

    // Returns the created user
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Login a new user
// @route   /api/users/login
// @access  (Token/Auth) public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).exec()
    
    // check if user and password are matching
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials.')
    }
})

// @desc    Get current user
// @route   /api/users/me
// @access  (Token/Auth) private
const getMe = asyncHandler(async (req, res) => {
    const user = { 
        id: req.user._id, 
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
})

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { 
        expiresIn: '30d' 
    });
}

module.exports = {
    registerUser, 
    loginUser,
    getMe
}