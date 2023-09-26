// src/components/POS.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import './pos.css';
import { clearTrans, addItem, removeItem, updateItem, addDiscount, clearDiscount } from '../../redux/actions/transactionActions';
import prod from '../../products';

const POS = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const items = useSelector(state => state.transaction.items);
    const total = useSelector(state => state.transaction.total);
    const discount = useSelector(state => state.transaction.discount);
    const taxes = useSelector(state => state.transaction.taxes);
    const [showEdit, setShowEdit] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [ discountType, setDiscountType ] = useState('percent');
    const [ currDiscount, setCurrDiscount ] = useState(0);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [ currItem, setCurrItem ] = useState('');
    const [ newQty, setNewQty ] = useState(0);

    const [paymentMode, setPaymentMode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [cashReceived, setCashReceived] = useState(0);
    const [change, setChange] = useState(0);
    
    useEffect(() => {
        if (!inputRef.current) return;
    
        inputRef.current.focus();
    
        const handleBlur = () => {
            if (inputRef.current && !showEdit && !showDiscount) {
                inputRef.current.focus();
            }
        };
    
        inputRef.current.addEventListener('blur', handleBlur);
        
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('blur', handleBlur);
            }
        };
    }, [showEdit, showDiscount]);
    

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

    const handleDiscount = () => {
        if(currDiscount < 0 || total <= 0) return;
        console.log('dis', currDiscount)
        if(discountType === 'dollar') {
            console.log('1', discountType);
            dispatch(addDiscount(currDiscount));
        } else {
            console.log('12', discountType);
            const amount = total * (currDiscount/100);
            dispatch(addDiscount(amount));
        }
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
        console.log('prods', prod[0]);
        let product = prod.filter(product => product.barcode == barcode);
        console.log('product', product)
        if (product.length > 0) {
            dispatch(addItem(product[0]));
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
    };

    return (
        <div className="container mt-4 row">
            <div className='col-lg-8'>
                <h2>POS System</h2>
                
                <input 
                    className='scanInput'
                    ref={inputRef}
                    type="text" 
                    placeholder="Scan item" 
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            console.log('barcode', barcode);
                            handleScan();
                        }
                    }}
                />

                <table className="table tableBody">
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
                                setShowEdit(true);
                                }}>
                                <td>{item.name}</td>
                                <td>{item.transQty}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${item.totalPrice.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    discount > 0 ? <h6>Discount: ${discount.toFixed(2)}</h6> : ''
                }
                {
                    taxes > 0 ? <h6>Taxes: ${taxes.toFixed(2)}</h6> : ''
                }
                <h3>Total: ${total.toFixed(2)}</h3>

                {/* <div>
                    <label className='p-3'>
                        <input type="radio" value="Cash" checked={paymentMode === 'Cash'} onChange={() => setPaymentMode('Cash')} />
                        Cash
                    </label>
                    <label>
                        <input type="radio" value="Credit Card" checked={paymentMode === 'Credit Card'} onChange={() => setPaymentMode('Credit Card')} />
                        Credit Card
                    </label>
                </div> */}

                {paymentMode === 'Cash' && (
                    <div className="mb-3">
                        <label className="form-label">Cash Received:</label>
                        <input type="number" className="form-control" value={cashReceived} onChange={e => setCashReceived(parseFloat(e.target.value))} />
                    </div>
                )}
                <div className='row'>
                    <button className='customBtn' onClick={handlePayment}>Cash</button>
                    <button className='customBtn' onClick={handlePayment}>Card</button>

                    {paymentMode === 'Cash' && change > 0 && (
                        <div className="mt-3">
                            <h4>Change to give back: ${change.toFixed(2)}</h4>
                        </div>
                    )}
                    <button className="printBtn" onClick={handlePrintReceipt}>Print Receipt</button>
                    <button className="printBtn" onClick={handlePrintReceipt}>Print Receipt 2</button>
                </div>
            </div>
            <div className='col-lg-4 mt-5'>
                <div className='row mt-5'>
                    <div className='row'>
                        <button disabled={total === 0} className='col customBtn' onClick={() => setShowDiscount(true)}>Discount</button>
                        <button className='col customBtn'>Tax</button>
                        <button className='col customBtn'>Refund</button>
                    </div>
                    <div className='row'>
                        <button className='col customBtn'>Non-UPC items</button>
                        <button className='col customBtn'>Open drawer</button>
                        <button 
                            className='col customBtn' 
                            onClick={() => dispatch(clearTrans())}
                            >Clear transaction</button>
                    </div>
                    <div className='row'>
                        <button className='col customBtn'>Price check</button>
                        <button className='col customBtn'>Save transaction</button>
                    </div>
                </div>
            </div>
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete/modify item</Modal.Title>
                </Modal.Header>
                <Modal.Body>{currItem.name}</Modal.Body>
                    <div className='row'>
                        <label className='m-3 col-md-4'>Quantity:</label>
                        <input type='number' min="1" max="100" className='form-control customInput' placeholder={currItem.transQty} onChange={(e) => setNewQty(e.target.value)}/>
                    </div>
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => setShowEdit(false)}>
                        Close
                    </button>
                    <button className='btn btn-lg btn-success' onClick={() => {
                        dispatch(updateItem(currItem.barcode, newQty));
                        setShowEdit(false);
                        }}>
                        Update
                    </button>
                    <button className='btn btn-lg btn-danger' onClick={() => {
                        dispatch(removeItem(currItem.barcode));
                        setShowEdit(false);
                        }}>
                        Delete Item
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDiscount} onHide={() => setShowDiscount(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Discount</Modal.Title>
                </Modal.Header>
                    <div className='row'>
                        <label className='m-3 col-md-4'>amount</label>
                        <input type='number' min="1" max="100" className='form-control customInput'  onChange={(e) => setCurrDiscount(e.target.value)}/>
                    </div>
                    <div className='row'>
                        <label className='col m-3'>
                            <input className='m-2' type='radio' value='dollar' checked={discountType === 'dollar'} onChange={() => setDiscountType('dollar')}/>
                            Dollar
                        </label>
                        <label className='col m-3'>
                            <input className='m-2' type='radio' value='percent' checked={discountType === 'percent'} onChange={() => setDiscountType('percent')}/>
                            Percent
                        </label>
                    </div>
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => {
                        setDiscountType('percent')
                        setShowDiscount(false);
                        }}>
                        Close
                    </button>
                    <button className='btn btn-lg btn-success' onClick={() => {
                        handleDiscount();
                        setDiscountType('percent');
                        setShowDiscount(false);
                        }}>
                        Submit
                    </button>
                    <button className='btn btn-lg btn-danger' onClick={() => {
                        dispatch(clearDiscount());
                        setDiscountType('percent');
                        setShowDiscount(false);
                        }}>
                        Clear Discount
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default POS;
