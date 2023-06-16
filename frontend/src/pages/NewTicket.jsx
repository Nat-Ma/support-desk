import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'

const NewTicket = () => {
    const [product, setProduct] = useState('Toys')
    const [description, setDescription] = useState('')
    
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        const ticketData = {
            user,
            product,
            description,
            status: 'new'
        }

        dispatch(createTicket(ticketData))
        dispatch(reset())

        setProduct('Toys')
        setDescription('')

        toast.success('Ticket was created successfully!')
    }

    return (
        <>
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
