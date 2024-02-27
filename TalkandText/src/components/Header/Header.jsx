import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../../services/auth-service'; 
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../context/AppContext'

function Header() {

    const { user, setUser } = useContext(AppContext);
    const { userData } = useContext(AppContext)

    const navigate = useNavigate();

    const logoutUser = async () => {
      await logout()
      setUser({ user: null, userData: null })
  }

  return (
    <header>
        <NavLink to='/'>Home</NavLink>

        {user 
        ? (
            <>
            {`Welcome, ${user.username}`}
            <button onClick={logoutUser}>Logout</button>
            </>
        )
        : (
            <>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
            </>
        )}

    </header>
  )
}

export default Header