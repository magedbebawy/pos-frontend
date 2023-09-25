// src/components/POS.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import './pos.css';
import { clearTrans, addItem, removeItem} from '../../redux/actions/transactionActions';
import prod from '../../products';

const POS = () => {
    const inputRef = useRef(null);
    const dsipatch = useDispatch();
    const items = useSelector(state => state.transaction.items);
    const total = useSelector(state => state.transaction.total);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ currItem, setCurrItem ] = useState('');
    console.log('items', items);
    const [paymentMode, setPaymentMode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [cashReceived, setCashReceived] = useState(0);
    const [change, setChange] = useState(0);
    
    useEffect(() => {
        inputRef.current.focus();

        const handleBlur = () => {
            if(!show) {
                inputRef.current.focus();
            }
        };
    
        inputRef.current.addEventListener('blur', handleBlur);
    
        return () => {
            inputRef.current.removeEventListener('blur', handleBlur);
        };
      }, [show]);

    const handlePrintReceipt = () => {
        const receiptData = {
            items,
            total,
            paymentMode,
            cashReceived,
            change
        };
    
        // Send the receipt data to a local server/service that can print to the default printer
        axios.post('http://localhost:5000/printReceipt', receiptData)
            .then(response => {
                if (response.data.success) {
                    alert('Receipt printed successfully!');
                } else {
                    alert('Error printing receipt.');
                }
            })
            .catch(error => {
                console.error('Error sending receipt data to printer: ', error);
            });
    }

    const handleScan = () => {
        // axios.get(`http://localhost:5000/products/${barcode}`)
        //     .then(response => {
        //         setItems(prevItems => [...prevItems, response.data]);
        //         setTotal(prevTotal => prevTotal + response.data.price);
        //         setBarcode(''); // Clear the barcode input
        //     })
        //     .catch(error => {
        //         console.error("Error fetching product: ", error);
        //     });
        let product = prod.filter(product => product.barcode == barcode);
        console.log('product', product[0]);
        if (product.length > 0) {
            dsipatch(addItem(product[0]));
            setBarcode('');
            return;
        }else {
            alert('Product not found');
            setBarcode('');
        }
    };

    const handlePayment = () => {
        if (paymentMode === 'Cash') {
            if (cashReceived < total) {
                alert('Cash received is less than the total amount.');
                return;
            }
            setChange(cashReceived - total);
        }
        // Handle other payment logic here, like printing the receipt.
        console.log("Payment done using:", paymentMode);
    };

    return (
        <div className="container mt-4 row">
            <div className='col-md-8'>
                <h2>POS System</h2>
                
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Scan item" 
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            handleScan();
                        }
                    }}
                />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit price</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.barcode} onClick={() => {
                                setCurrItem(item);
                                handleShow();
                            }}>
                                <td>{item.name}</td>
                                <td>{item.transQty}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${item.totalPrice.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Total: ${total.toFixed(2)}</h3>

                <div>
                    <label className='p-3'>
                        <input type="radio" value="Cash" checked={paymentMode === 'Cash'} onChange={() => setPaymentMode('Cash')} />
                        Cash
                    </label>
                    <label>
                        <input type="radio" value="Credit Card" checked={paymentMode === 'Credit Card'} onChange={() => setPaymentMode('Credit Card')} />
                        Credit Card
                    </label>
                </div>

                {paymentMode === 'Cash' && (
                    <div className="mb-3">
                        <label className="form-label">Cash Received:</label>
                        <input type="number" className="form-control" value={cashReceived} onChange={e => setCashReceived(parseFloat(e.target.value))} />
                    </div>
                )}

                <button className='btn btn-primary' onClick={handlePayment}>Complete Purchase</button>

                {paymentMode === 'Cash' && change > 0 && (
                    <div className="mt-3">
                        <h4>Change to give back: ${change.toFixed(2)}</h4>
                    </div>
                )}
                <button className="m-3 btn btn-success" onClick={handlePrintReceipt}>Print Receipt</button>
                <button className="m-3 btn btn-success" onClick={handlePrintReceipt}>Print Receipt 2</button>
            </div>
            <div className='col-md-4 mt-5'>
                <div className='row mt-5'>
                    <div className='row'>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Discount</button>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Tax</button>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Refund</button>
                    </div>
                    <div className='row'>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Non-UPC items</button>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Open drawer</button>
                        <button 
                            className='col btn btn-md btn-dark m-2 p-2' 
                            onClick={() => dsipatch(clearTrans())}
                            >Clear transaction</button>
                    </div>
                    <div className='row'>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Price check</button>
                        <button className='col btn btn-md btn-dark m-2 p-2'>Save transaction</button>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete/modify item</Modal.Title>
                </Modal.Header>
                <label className='m-2'>Quantity:</label>
                <input className='form-control customInput' placeholder={currItem.transQty} />
                <Modal.Footer>
                <button className='btn btn-primary' onClick={handleClose}>
                    Close
                </button>
                <button className='btn btn-success' onClick={handleClose}>
                    Update
                </button>
                <button className='btn btn-danger' onClick={handleClose}>
                    Delete Item
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default POS;
