import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../context/AppContext'
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../AvatarMenu/StyledBadge';
import { AvatarMenu } from '../AvatarMenu/AvatarMenu';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar alt="User Avatar" src="/madagascar.png" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              HiGuys
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              onClick={handleClick}
              variant="dot"
            >
              <Avatar alt="User Avatar" src={userData?.avatarUrl} />
            </StyledBadge>
            <AvatarMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}


// <header>
//         <NavLink to='/'>Home</NavLink>
//         {/* <NavLink to='/createteams'>Create Teams</NavLink> */}
//         {user
//           ? (
//             <>
//               {`Welcome, ${userData?.username}`}
//               {/* <NavLink to='/create-channel'>Create Channel</NavLink> */}
//               <StyledBadge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 onClick={handleClick}
//                 variant="dot"
//               >
//                 <Avatar alt="User Avatar" src={userData?.avatarUrl} />
//               </StyledBadge>
//               <AvatarMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
//               {/* <NavLink to="/profile">Profile</NavLink> */}
//               {/* <button onClick={logoutUser}>Logout</button> */}
//             </>
//           )
//           : (
//             <>
//               <NavLink to='/register'>Register</NavLink>
//               <NavLink to='/login'>Login</NavLink>
//             </>
//           )}
//       </header>
