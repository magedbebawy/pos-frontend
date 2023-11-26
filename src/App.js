import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import NewProduct from './components/NewProduct';
import POS from './components/POS/Pos';
import ProductList from './components/ProductList';
import SalesList from './components/SalesList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminSignIn from './components/AdminSignIn';
import AdminSignUp from './components/AdminSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignin, adminSignout } from './redux/actions/userActions';


function App() {
  const URL = 'http://localhost:3000';
  const dsipatch = useDispatch();
  const signedIn = useSelector(state => state.user.signedIn);

  useEffect(async () => {
    try {
      const data = {
        token: localStorage.getItem('token')
    }

    const apiResponse = await fetch(`${URL}/user/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(await apiResponse.json());
    } catch (err) {
      console.log(err);
    }
  },[])
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/products" element={<ProductList/>} />
            <Route path="/products/new"  element={<NewProduct/>}/>
            <Route path="/sales" element={<SalesList/>} />
            <Route path="/" element={<POS/>} />
            <Route path="/admin/signin" element={<AdminSignIn/>} />
            <Route path="/admin/signup" element={<AdminSignUp/>} />
            <Route path="/cashier/signin" element={<SignIn/>} />
            <Route path="/cashier/signup" element={<SignUp/>} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    );
}

export default App;