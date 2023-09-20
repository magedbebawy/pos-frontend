// src/components/SalesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesList = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        // Fetch sales data from your API
        axios.get('http://localhost:5000/sales')
            .then(response => {
                setSales(response.data);
            })
            .catch(error => {
                console.error("Error fetching sales data: ", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Sales</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
