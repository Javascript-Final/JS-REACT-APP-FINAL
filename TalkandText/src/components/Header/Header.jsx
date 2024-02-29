import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../../services/auth-service';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../context/AppContext'
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../AvatarMenu/StyledBadge';
import { AvatarMenu } from '../AvatarMenu/AvatarMenu';

export function Header() {

  const { user, userData, setContext } = useContext(AppContext);

  const [avatarUrl, setAvatarUrl] = useState(userData?.avatarUrl);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAvatarUrl(userData?.avatarUrl);
  }, [userData]);

  // const logoutUser = async () => {
  //   await logout();
  //   setContext({ user: null, userData: null })
  // }

  return (
    <header>
      <NavLink to='/'>Home</NavLink>
      {user
        ? (
          <>
            {`Welcome, ${userData?.username}`}
            {/* <NavLink to='/create-channel'>Create Channel</NavLink> */}
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              onClick={handleClick}
              variant="dot"
            >
              <Avatar alt="User Avatar" src={userData?.avatarUrl} />
            </StyledBadge>
            <AvatarMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
            {/* <NavLink to="/profile">Profile</NavLink> */}
            {/* <button onClick={logoutUser}>Logout</button> */}
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
