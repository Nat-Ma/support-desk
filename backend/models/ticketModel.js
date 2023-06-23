const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['Dog Food', 'Treats', 'Toys', 'Ball'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description of the issue'],
    },
    status: {
        type: String,
        required: [true, 'Please select a status'],
        enum: ['new', 'open', 'closed'],
    },
}, { timestamps: true })

module.exports = mongoose.model('Ticket', ticketSchema)