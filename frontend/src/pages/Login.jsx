import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    })

    const navigate = useNavigate()
    const { email, password } = formData

    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, message, isSuccess, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email, 
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email" 
                            name="email"
                            value={email} 
                            onChange={onChange} 
                            placeholder="Enter your email" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            value={password} 
                            onChange={onChange} 
                            placeholder="Enter your password" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
