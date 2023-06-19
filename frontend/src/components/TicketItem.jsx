import React from 'react'
import { Link } from 'react-router-dom'

const TicketItem = ({ ticket }) => {
  return (
    <div className='ticket'>
        {/* <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div> */}
        <div>{ticket.product}</div>
        <div>{ticket.description}</div>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
        <Link to={`/tickets/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View Ticket
        </Link>
    </div>
  )
}

export default TicketItem
