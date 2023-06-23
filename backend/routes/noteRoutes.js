const express = require('express')
// can go to ticket routes and bring note Routes to Ticket Routes 
// and create Path ../:ticketId/notes
const router = express.Router({ mergeParams: true })
const { getNotes, createNote } = require('../controllers/noteController')
const { protectRoute } = require('../middleware/authMiddleware')

router.route('/')
    .get(protectRoute, getNotes)
    .post(protectRoute, createNote)


module.exports = router