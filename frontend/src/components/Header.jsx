import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">Support Desk</NavLink>
      </div>
      {user ? (
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
              <NavLink to="/login">
                  <FaSignInAlt /> Login
              </NavLink>
          </li>
          <li>
              <NavLink to="/register">
                  <FaUser /> Register
              </NavLink>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header
