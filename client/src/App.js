import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { getAuthUser } from './JS/actions/authActions';


function App() {
  const dispatch = useDispatch();
  const getUser = async()=> await dispatch(getAuthUser())

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<h1>Welcome To Home Page</h1>} />
        
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
        
      </Routes>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}

export default App;
