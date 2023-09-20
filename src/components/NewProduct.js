// src/components/NewProduct.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const NewProduct = () => {
    const [barcode, setBarcode] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [taxable, setTaxable] = useState(false);

    const handleSubmit = () => {
        axios.post('http://localhost:5000/products', {
            name: productName,
            price: productPrice,
            quantity: quantity,
            taxable: taxable
        })
        .then(response => {
            toast.success('Product added!');
            setProductName('');
            setProductPrice('');
            setQuantity(0);
            setTaxable(false);
        })
        .catch(error => {
            toast.error("Error adding product")
            console.error("Error adding product: ", error);
        });
    };

    return (
        <div className="container mt-4">
        <h2>Add New Product</h2>
        <div className="mb-3">
            <label className="form-label">Barcode</label>
            <input
            type="text"
            className="form-control"
            value={barcode}
            onChange={e => setBarcode(e.target.value)}
            placeholder="Scan Barcode or Enter Manually"
            />
        </div>
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
            <label className="form-label">Product Price</label>
            <input
            type="number"
            className="form-control"
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
            placeholder="Product Price"
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
        <div className="mb-3 form-check">
            <input
            type="checkbox"
            className="form-check-input"
            id="taxable"
            checked={taxable}
            onChange={e => setTaxable(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="taxable">Taxable</label>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default NewProduct;
