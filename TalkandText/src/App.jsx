import './App.css'
import { useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
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
import MyTeams from './views/MyTeams';
import { SingleUserProfileView } from './views/SingleUserProfileView';
import ChatView from './views/Chat';
import ChannelView from './views/ChannelView/ChannelView';

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  })

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading && user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        })
    }
  }, [user, loading]);


 /*  useEffect(() => {
    if()

  },[]) */

  // onvalue ot firebase

  function ChatViewWrapper() {
    const { channelTitle } = useParams();
    return <ChatView channelTitle={channelTitle} />;
  }

  function ChannelViewWrapper() {
    const { cid } = useParams();
    return <ChannelView cid={cid} />;
  }

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-channel' element={<Authenticated><Header /><CreateChannel /></Authenticated>} />
          <Route path='/single-team-view/:tid' element={<Authenticated><Header /><SingleTeamView /></Authenticated>} />
          <Route path='/single-profile-view/:uid' element={<Authenticated><Header /><SingleUserProfileView /></Authenticated>} />
          <Route path='/create-teams' element={<Authenticated><Header /><CreateTeams /></Authenticated>} />
          <Route path='/my-teams' element={<Authenticated><Header /><MyTeams /></Authenticated>} />
          <Route path='/profile' element={<Authenticated><Header /><Profile /></Authenticated>} />
         {/*  <Route path='/teams/' element={<Authenticated><Header /><Teams /></Authenticated>} /> */}
          <Route path="/chat/:channelTitle" element={<Authenticated><Header /><ChatViewWrapper /></Authenticated>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );

}

export default App
