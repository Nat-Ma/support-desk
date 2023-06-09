const express = require('express')
const router = express.Router()
const { createTicket, getTickets, getSingleTicket, deleteTicket, updateTicket } = require('../controllers/ticketControllers')
const { protectRoute } = require('../middleware/authMiddleware')

router.route('/')
    .get(protectRoute, getTickets)
    .post(protectRoute, createTicket)

router.route('/:id')
    .get(protectRoute, getSingleTicket)
    .delete(protectRoute, deleteTicket)
    .put(protectRoute, updateTicket)

module.exports = router