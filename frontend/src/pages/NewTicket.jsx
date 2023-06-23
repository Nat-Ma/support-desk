import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTicket } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {
    const [product, setProduct] = useState('Toys')
    const [description, setDescription] = useState('')
    
    const { user } = useSelector(state => state.auth)
    const { ticket, isLoading, isError, isSuccess, message } = useSelector(state => state.tickets)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/tickets')
        }
    }, [dispatch, isError, isSuccess, navigate, message, ticket])

    const onSubmit = (e) => {
        e.preventDefault()

        const ticketData = {
            user,
            product,
            description,
            status: 'new'
        }

        dispatch(createTicket(ticketData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h2>Create New Ticket</h2>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor='name'>Customer Name</label>
                    <input id="name" type='text' className='form-control' value={user.name} disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Customer Email</label>
                    <input id="email" type='text' className='form-control' value={user.email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select 
                            name="product" 
                            id="product"
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        >
                            <option value='Toys'>Toys</option>
                            <option value='Treats'>Treats</option>
                            <option value='Dog Food'>Dog Food</option>
                            <option value='Ball'>Ball</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Describe the issue</label>
                        <textarea 
                            name="description" 
                            id="description"
                            className="form-control"
                            placeholder='Describe the problem...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
