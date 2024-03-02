import './App.css'
import { useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import Register from './views/Register';
import Home from './views/Home';
import Login from './views/Login';
import { auth } from './config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/user-service';
import CreateChannel from './views/CreateChannel';
import { Profile } from './views/Profile';
import SingleTeamView from './views/SingleTeamView';
import Teams from './views/CreateTeams';
import CreateTeams from './views/CreateTeams';

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
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path= '/create-channel' element={<CreateChannel/>} />
          <Route path= '/single-team-view' element={<SingleTeamView/>} />
          <Route path= '/createteams' element={<CreateTeams/>} />
          <Route path= '/profile' element={<Profile/>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );

}

export default App
