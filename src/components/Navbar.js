// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
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
                                    navigate('/admin/signin');
                                    console.log("Logged Out");
                                }}>Sign In</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
