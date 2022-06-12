import React, {useState, useContext, createContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

export const store = createContext();


function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      < Navbar />
      <Routes>
      <Route path='/register' element={< Register />}></Route>
      <Route path='/login' element={< Login />}></Route>
      <Route path='/dashboard' element={< Dashboard />}></Route>
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
