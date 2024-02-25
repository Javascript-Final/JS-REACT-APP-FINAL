import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

function Header() {

    const { user, setUser } = useContext(AppContext);


  return (
    <header>
        <NavLink to='/'>Home</NavLink>

        {user 
        ? (
            <>
            {`Welcome, ${user.username}`}
            <button onClick={() => setUser(null)}>Logout</button>
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