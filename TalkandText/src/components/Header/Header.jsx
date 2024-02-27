import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../../services/auth-service'; 
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../context/AppContext'

export function Header() {

    const { user, setContext } = useContext(AppContext);
    const { userData } = useContext(AppContext);

    const [avatarUrl, setAvatarUrl] = useState(userData?.avatarUrl);

    const navigate = useNavigate();

    useEffect(() => {
      setAvatarUrl(userData?.avatarUrl);
  }, [userData]);
    console.log(userData);

    const logoutUser = async () => {
      await logout();
      setContext({ user: null, userData: null })
  }

  return (
    <header>
        <NavLink to='/'>Home</NavLink>
        {user 
        ? (
            <>
            {`Welcome, ${userData?.username}`}
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
