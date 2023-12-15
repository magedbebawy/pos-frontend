import React from "react";
import { Link } from "react-router-dom";


const Stores = () => {
    return (
        <div className="container mt-5">
            <p>No stores</p>
            <Link to='/stores/newstore'>Create new store</Link>
        </div>
    )
}

export default Stores;