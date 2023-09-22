import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import prod from '../products';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [maxUnits, setMaxUnits] = useState(1000);
    const [showActive, setShowActive] = useState('all');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedProduct({});
    };


    useEffect(() => {
        setProducts(prod);
        const handleEsc = (event) => {
            if (event.keyCode === 27) closeEditModal();  // 27 is the keycode for the ESC key
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
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
            
            <div className='row'>
                <div className="mt-4 mb-3 col-md-3">
                    <input 
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Filtering by number of units */}
                <div className="mb-3 col-md-3">
                    <label>Max Units Available:</label>
                    <input 
                        type="number" 
                        value={maxUnits}
                        onChange={e => setMaxUnits(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Filtering by active status */}
                <div className="mb-3 col-md-3">
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
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Taxable</th>
                        <th>Actions</th>
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
                            <td><button className='btn btn-secondary btn-sm' onClick={() => openEditModal(product)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditModal && (
                <>
                    <div className="modal-backdrop show" onClick={closeEditModal}></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Product: {selectedProduct.name}</h5>
                                    <button type="button" className="close" onClick={closeEditModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <label className='m-1'>Product Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control m-1"
                                        value={selectedProduct.name} 
                                        onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                                    />
                                    <label className='m-1'>Product Price:</label>
                                    <input 
                                        type="text" 
                                        className="form-control m-1"
                                        value={selectedProduct.price} 
                                        onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})}
                                    />
                                    <label className='m-1'>Quantity:</label>
                                    <input 
                                        type="text" 
                                        className="form-control m-1"
                                        value={selectedProduct.quantity} 
                                        onChange={(e) => setSelectedProduct({...selectedProduct, quantity: e.target.value})}
                                    />
                                    <label className='m-1'>Taxable: </label>
                                    <input
                                        type="checkbox"
                                        className="form-check-input m-2"
                                        id="taxable"
                                        checked={selectedProduct.taxable}
                                        onChange={e => setSelectedProduct({...selectedProduct, taxable: e.target.checked})}
                                        />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        closeEditModal();
                                    }}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )}



            
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

