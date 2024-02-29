import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Avatar, Divider, ListItemIcon } from '@mui/material';
import { Settings, PersonAdd, Logout } from '@mui/icons-material';
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../../services/auth-service';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export const AvatarMenu = ({ open, anchorEl, handleClose }) => {

    const navigate = useNavigate();

    const { user, userData, setContext } = useContext(AppContext);

    const logoutUser = async () => {
        await logout();
        navigate('/')
        setContext({ user: null, userData: null })
    }

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => { navigate('/profile') }}>
                <Avatar alt="User Avatar" src={userData?.avatarUrl} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/create-channel') }}>
                <Avatar /> Create channel
            </MenuItem>
            <Divider />
            <MenuItem onClick={logoutUser}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}
