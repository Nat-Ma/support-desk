const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/noteModel')

// @desc    Get user tickets
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }
    
    // Get Ticket
    const ticket = await Ticket.findById(req.params.ticketId) 

    // Returns ticket if from user
    if (ticket.user.toString() === req.user.id) {
        const notes = await Note.find({ ticket: req.params.ticketId })

        res.status(200).json(notes)
    } else {
        res.status(401)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user tickets
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {

    const { text } = req.body

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // Validation
    if (!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }
    
    // Get Ticket
    const ticket = await Ticket.findById(req.params.ticketId) 

    // Returns ticket if from user
    if (ticket.user.toString() === req.user.id) {
        const note = await Note.create({ user, ticket, text })

        res.status(200).json(note)
    } else {
        res.status(401)
        throw new Error('Invalid user data')
    }
})

module.exports = {
    getNotes,
    createNote,
}