const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    // // Validation
    if (!product || !description ) {
        res.status(400)
        throw new Error('Please include all fields.')
    }

    if (!user) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    // // Create Ticket
    const ticket = await Ticket.create({ user, product, description, status: 'new' }) 

    // // Returns the created ticket
    if (ticket) {
        res.status(201).json(ticket)
    } else {
        res.status(400)
        throw new Error('Invalid ticket data')
    }
})

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }
    
    // // Create Ticket
    const tickets = await Ticket.find({ user }) 

    // // Returns the created ticket
    if (tickets) {
        res.status(200).json(tickets)
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getSingleTicket = asyncHandler(async (req, res) => {

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }
    
    // Find Ticket
    const ticket = await Ticket.findById(req.params.id) 

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    // // Returns the created ticket
    if (ticket) {
        res.status(200).json(ticket)
    } else {
        res.status(404)
        throw new Error('Ticket does not exist')
    }
})

// @desc    Delete ticket
// @route   GET /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }

    // Find Ticket
    await Ticket.findByIdAndDelete(req.params.id)

    // Sends success status
    res.status(200).json({ success: true })
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }

    // Find Ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { product, description }, { new: true })

    if (updatedTicket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    // Returns the created ticket
    if (updatedTicket) {
        res.status(200).json(updatedTicket)
    } else {
        res.status(404)
        throw new Error('Ticket does not exist')
    }
})


module.exports = {
    createTicket,
    getTickets,
    getSingleTicket,
    deleteTicket,
    updateTicket,
}