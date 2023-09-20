// src/components/NewSale.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Assuming you're still using react-toastify for notifications

const NewSale = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSubmit = () => {
        // Send the sale data to your API
        axios.post('http://localhost:5000/sales', {
            productName,
            quantity,
            totalPrice
        })
        .then(response => {
            toast.success('Sale added successfully!');
            setProductName('');
            setQuantity(1);
            setTotalPrice(0);
        })
        .catch(error => {
            toast.error("Error adding sale: " + error);
        });
    };

    return (
        <div className="container mt-4">
            <h2>Add New Sale</h2>
            
            <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Product Name"
                />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Quantity"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Total Price</label>
                <input
                    type="number"
                    className="form-control"
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)}
                    placeholder="Total Price"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>Add Sale</button>
        </div>
    );
}

export default NewSale;
