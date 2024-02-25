

import './App.css'
import { useState } from 'react'
import { AppContext } from './context/AppContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Register from './views/Register';
import Home from './views/Home';
import Login from './views/Login';


function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  
  })


  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext }}>
        
        <Header />
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        
          
       
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
    // </div>
  );
  
}

export default App
