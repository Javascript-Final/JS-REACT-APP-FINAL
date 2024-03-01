import React from 'react'
import {
  Grid, CssBaseline, Avatar, Typography, Box, Paper, TextField,
  FormControlLabel, Checkbox, Button, Link
} from '@mui/material'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import { useState } from 'react';

function Home() {
  const [component, setComponent] = useState("Login")
  const switchToRegister = () => { setComponent("Register") }
  const switchToLogin = () => { setComponent("Login") }
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        alignContent={"center"}
        sx={{
          backgroundImage: 'url(/madagascar.png),url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: '40%, cover',
          backgroundPosition: 'center, center',
        }}
      >
        <Typography 
          pt={"30%"}
          component={"h1"}
          variant={"h3"}
          sx={{color: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
               textShadow: "1px 1px 2px black"}}
        >
          HiGuys
        </Typography>
        {/* <Box
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}
        >
          <Box
            width={"300px"}
            height={"300px"}
            borderRadius={"50%"}
            
            backgroundRepeat={"no-repeat"}
            backgroundColor={"white"}
            alignContent={"center"}
            paddingTop={"5%"}>
            
            <Grid>
              <img src="/madagascar.png" width="250px" height="250px"/>
            </Grid>
          </Box>
        </Box> */}
      </Grid>
      {component === 'Login' ? <Login switchComponent={switchToRegister}/> : <Register switchComponent={switchToLogin}/>}
    </Grid>
  )
}

export default Home