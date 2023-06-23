import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {

    const { tickets, isError, isSuccess, message } = useSelector(state => state.tickets)
    const dispatch = useDispatch()

    // return function on unmount to reset, otherwise endless loop
    useEffect(() => {
        if (isSuccess) {
            return () => dispatch(reset())
        }

    }, [isSuccess, dispatch])


    useEffect(() => {
        dispatch(getTickets())

        if(isError) {
            toast.error(message)
        }

    }, [dispatch, message, isError])


    if (!tickets) {
        return <Spinner />
    }

  return (
    <>
        <BackButton url="/" />
        <h1>Tickets</h1>
        <div className='tickets'>
        <div className='ticket-headings'>
          <div>Product</div>
          <div>Description</div>
          <div>Status</div>
          <div></div>
        </div>
            {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
            ))}
      </div>
    </>
  )
}

export default Tickets
