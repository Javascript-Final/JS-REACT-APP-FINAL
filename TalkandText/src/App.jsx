import './App.css'
import { useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import Register from './components/Register/Register';
import Home from './views/Home';
import Login from './components/Login/Login';
import { auth } from './config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/user-service';
import CreateChannel from './views/CreateChannel';
import { Profile } from './views/Profile';
import SingleTeamView from './views/SingleTeamView';
import CreateTeams from './views/CreateTeams';
import Authenticated from './hoc/Authenticated'
import Teams from './views/Teams';

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  })

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        })
    }
  }, [user]);
  
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
         {/*  <Route path= '/create-channel' element={<CreateChannel/>} />
          <Route path= '/single-team-view' element={<SingleTeamView/>} />
          <Route path= '/createteams' element={<CreateTeams/>} />
          <Route path= '/profile' element={<Profile/>} /> */}
            <Route path= '/create-channel' element={<Authenticated><Header /><CreateChannel/></Authenticated>} />
           <Route path= '/single-team-view' element={<Authenticated><Header /><SingleTeamView/></Authenticated>} />
           <Route path= '/create-teams' element={<Authenticated><Header /><CreateTeams/></Authenticated>} />
           <Route path= '/profile' element={<Authenticated><Header /><Profile/></Authenticated>} />
           <Route path= '/teams/' element={<Authenticated><Header /><Teams/></Authenticated>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );

}

export default App
