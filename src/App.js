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
import Account from './components/Account';
import Stores from './components/Stores';
import CreateStore from './components/CreateStore';


function App() {
  const URL = 'http://localhost:3000';
  const dsipatch = useDispatch();
  const signedIn = useSelector(state => state.user.signedIn);

  useEffect(() => {
    async function verifyToke() {
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
      if(apiResponse.ok) {
        dsipatch(adminSignin());
      } else {
        dsipatch(adminSignout());
      }
      } catch (err) {
        console.log(err);
      }
    }

    verifyToke();

  },[])
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/products" element={signedIn ? <ProductList/> : <AdminSignIn/>} />
            <Route path="/products/new"  element={signedIn ? <NewProduct/> : <AdminSignIn/>}/>
            <Route path="/sales" element={signedIn ? <SalesList/> : <AdminSignIn/>} />
            <Route path="/" element={signedIn ? <POS/> : <AdminSignIn/>} />
            <Route path="/admin/signin" element={<AdminSignIn/>} />
            <Route path="/admin/signup" element={<AdminSignUp/>} />
            <Route path="/cashier/signin" element={signedIn ? <SignIn/> : <AdminSignIn/>} />
            <Route path="/cashier/signup" element={signedIn ? <SignUp/> : <AdminSignIn/>} />
            <Route path="/account" element={signedIn ? <Account/> : <AdminSignIn/>} />
            <Route path="/stores" element={signedIn ? <Stores/> : <AdminSignIn/>} />
            <Route path="/stores/newstore" element={signedIn ? <CreateStore/> : <AdminSignIn/>} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    );
}

export default App;