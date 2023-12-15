// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignin, adminSignout } from '../redux/actions/userActions';



const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signedIn = useSelector(state => state.user.signedIn);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">POS System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sales">Sales</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                                Actions
                            </a>
                            <div className="dropdown-menu">
                                <button className="dropdown-item">Close Shift</button>
                                <button className="dropdown-item">Close Day</button>
                                <button className="dropdown-item">Logout Cashier</button>
                                <button className="dropdown-item" onClick={() => {
                                    if (signedIn) {
                                        dispatch(adminSignout());
                                        localStorage.removeItem('token');
                                        navigate('/admin/signin');
                                    } else {
                                        navigate('/admin/signin');
                                    }
                                }}>{signedIn ? 'Logout Admin' : 'Login Admin'}</button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/account">Account</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
