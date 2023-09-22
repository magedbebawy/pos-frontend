// src/components/SalesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import salesData from '../sales';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [salesPerPage] = useState(10);  

    console.log(sales);
    useEffect(() => {
        // Fetch sales data from your API
        // axios.get('http://localhost:5000/sales')
        //     .then(response => {
        //         setSales(response.data);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching sales data: ", error);
        //     });
        setSales(salesData);
    }, []);

    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const displayedSales = sales.slice(indexOfFirstSale, indexOfLastSale);
    const totalPages = Math.ceil(sales.length / salesPerPage);


    return (
        <div className="container mt-4">
            <h2>Sales</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.price.toFixed(2)}</td>
                            <td><button className='btn btn-secondary btn-sm'>Print</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => setCurrentPage(1)}>First</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>Last</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SalesList;
