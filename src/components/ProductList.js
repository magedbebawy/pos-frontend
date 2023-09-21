import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import prod from '../products';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [maxUnits, setMaxUnits] = useState(1000);
    const [showActive, setShowActive] = useState('all'); // 'all', 'active', 'inactive'


    useEffect(() => {
        setProducts(prod);
    }, []);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Searching and pagination
    const displayedProducts = products
    .filter(product => product.barcode.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => product.quantity <= maxUnits)
    .filter(product => {
        if (showActive === 'active') return product.active;
        if (showActive === 'inactive') return !product.active;
        return true; // if 'all'
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);


    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Products</h2>
                <Link to="/products/new" className="btn btn-primary">Add New Product</Link>
            </div>
            
            {/* Search Functionality */}
            <div className="mt-3 mb-3">
                <input 
                    type="text" 
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-control"
                />
            </div>

            {/* Filtering by number of units */}
            <div className="mb-3">
                <label>Max Units Available:</label>
                <input 
                    type="number" 
                    value={maxUnits}
                    onChange={e => setMaxUnits(e.target.value)}
                    className="form-control"
                />
            </div>

            {/* Filtering by active status */}
            <div className="mb-3">
                <label>Show:</label>
                <select 
                    value={showActive}
                    onChange={e => setShowActive(e.target.value)}
                    className="form-control"
                >
                    <option value="all">All Products</option>
                    <option value="active">Active Products</option>
                    <option value="inactive">Inactive Products</option>
                </select>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Taxable</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.map(product => (
                        <tr key={product.barcode}>
                            <td>{product.barcode}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>{product.taxable ? 'Yes' : 'No'}</td>
                            <td><button className='btn btn-secondary btn-sm'>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pagination Controls */}
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

export default ProductList;

