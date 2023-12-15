import React from 'react'
import { Link } from "react-router-dom";

const Account = () => {
    return (
        <div className='container mt-5'>
            <div className="row">
                <Link to='/cahiers'>Cashiers</Link>
                <Link to='/stores'>Stores</Link>
            </div>
        </div>
    )
}

export default Account;