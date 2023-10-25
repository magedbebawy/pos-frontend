// src/components/POS.js

import Keyboard from '../Keyboard/Keyboard';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import './pos.css';
import { 
    clearTrans, 
    addItem, 
    removeItem, 
    updateItem, 
    addDiscount, 
    clearDiscount,
    addTax,
    removeTax,
    addTrans
} from '../../redux/actions/transactionActions';
import {
    addItemRefund,
    removeItemRefund,
    updateItemRefund,
    clearRefund
} from '../../redux/actions/refundActions';
import prod from '../../products';
import trans from '../../sales';
import soldItems from '../../productsSold';

const POS = () => {
    const [ transType, setTransType ] = useState('transaction');
    const inputRef = useRef(null);
    const priceCheckRef = useRef(null);
    const refundRef = useRef(null);
    const refundItemRef = useRef(null);
    const nonUpcRef = useRef(null);
    const discountRef = useRef(null);
    const dispatch = useDispatch();
    const refundState = useSelector(state => state.refund);
    const transactionState = useSelector(state => state.transaction);
    const transState = transType === 'transaction' ? transactionState : refundState;
    const items = transState.items;
    const total = transState.total;
    const discount = transState.discount;
    const taxes = transState.taxes;
    const [showEdit, setShowEdit] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [ discountType, setDiscountType ] = useState('percent');
    const [ currDiscount, setCurrDiscount ] = useState(0);
    const [ taxable, setTaxable ] = useState(true);
    const [ showPriceCheck, setShowPriceCheck ] = useState(false);
    const [ checkItem, setCheckItem ] = useState('');
    const [ checkItemBarcode, setCheckItemBarcode ] = useState('');
    const [ showRefund, setShowRefund] = useState(false);
    const [ noReciept, setNoReciept ] = useState(false);
    const [ showNonUpc, setShowNonUpc ] = useState(false);
    const [ nonUpcItems, setNonUpcItems ] = useState(prod);
    const [ savedTrans, setSavedTrans ] = useState([]);
    const [ showSavedTrans, setShowSavedTrans ] = useState(false);
    const [ showPayout, setShowPayout ] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
            if (inputRef.current && !showEdit && !showDiscount && !showPriceCheck && !showRefund && !showNonUpc) {
                inputRef.current.focus();
            }
        };

        if(showPriceCheck) {
            priceCheckRef.current && priceCheckRef.current.focus();
        };

        if(showNonUpc) {
            nonUpcRef.current && nonUpcRef.current.focus();
        };

        if(showRefund && !noReciept) {
            refundRef.current && refundRef.current.focus();
        }

        if(showRefund && noReciept) {
            refundItemRef.current && refundItemRef.current.focus();
        }

        if(showDiscount) {
            discountRef.current && discountRef.current.focus();
        }
    
        inputRef.current.addEventListener('blur', handleBlur);
        
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('blur', handleBlur);
            }
        };
    }, [showEdit, showDiscount, showPriceCheck, showRefund, noReciept, showNonUpc]);
    

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
            transType === 'transaction' ? dispatch(addItem(product[0])) : dispatch(addItemRefund(product[0]));
            console.log(items);
            setTaxable(true);
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

    // A function to get transaction details based on transaction id
    const getTrans = (id) => {
        console.log(trans);
        const transaction = trans.filter(item => item.id == id);
        console.log('trans', transaction);
        return transaction;
    }

    // A function to get all sold products per transaction by transaction ID
    const getSoldItems = (id) => {
        const soldProds = soldItems.filter(item => item.transactio_id == id);
        console.log('products sold', soldProds);
        return soldProds;
    }

    const handleRefund = (items) => {
        console.log('items', items);
        items.map(item => {
            dispatch(addItem(item));
        });
        
    }

    const saveTrans = (trans) => {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        console.log(transactions);
        transactions.push(trans);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    const getSavedTrans = () => {
        const storedTrans = localStorage.getItem('transactions');
  
        if (!storedTrans) return null;
        
        try {
            setSavedTrans(JSON.parse(storedTrans));
        } catch (e) {
            console.error('Error parsing the stored array:', e);
            return null; 
        }
    }

    const clearSavedTrans = () => {
        localStorage.removeItem('transactions');
    }

    const removeSavedTrans = (index) => {
        dispatch(addTrans(savedTrans[index]));
        let trans = savedTrans;
        trans.splice(index, 1);
        setSavedTrans(trans);
        localStorage.setItem('transactions', JSON.stringify(savedTrans));
    }

    return (
        <div className="container mt-4 row">
            <div className='col-lg-8'>
                <h2>POS System</h2>
                <div className='row'> 
                    <input 
                        className='scanInput col-lg-5 m-3'
                        ref={inputRef}
                        type="text" 
                        placeholder={transType === 'transaction' ? "Scan item"  : "Refund"}
                        value={barcode}
                        onChange={e => setBarcode(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                console.log('barcode', barcode);
                                handleScan();
                            }
                        }}
                    />
                    {
                        transType === 'refund' ? 
                        <button className='btn btn-dark col-lg-5 m-3'>Scan reciept</button> 
                        : ''
                    }
                    
                </div>

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
                            <tr className='customTr' key={item.barcode} onClick={() => {
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
                    discount != 0 ? <h6>Discount: ${discount.toFixed(2)}</h6> : ''
                }
                {
                    taxes != 0 ? <h6>Taxes: ${taxes.toFixed(2)}</h6> : ''
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
                        <button disabled={total <= 0} className='col customBtn' onClick={() => setShowDiscount(true)}>Discount</button>
                        {
                            taxable ? 
                            <button disabled={total <= 0} className='col customBtn' onClick={() => {
                                setTaxable(false);
                                dispatch(removeTax());
                            }}>Remove Tax</button> :
                            <button className='col customBtn selected' onClick={() => {
                                setTaxable(true);
                                dispatch(addTax());
                            }}>Add Tax</button>
                        }
                        {
                            transType === 'refund' ?
                            <button className='col customBtn selected' 
                            onClick={() => {
                                setTransType('transaction');
                                dispatch(clearRefund());
                            }}>Cancel Refund</button> :
                            <button className='col customBtn' 
                            onClick={() => {
                                setTransType('refund');
                                dispatch(clearTrans());
                            }}>Refund</button>
                        }
                    </div>
                    <div className='row'>
                        <button className='col customBtn' onClick={() => setShowNonUpc(true)}>Non-UPC items</button>
                        <button className='col customBtn'>Open drawer</button>
                        <button 
                            className='col customBtn' 
                            onClick={() => {
                                transType === 'transaction' ? dispatch(clearTrans()) :
                                dispatch(clearRefund());
                                setTaxable(true);
                            }}
                            >Clear transaction</button>
                    </div>
                    <div className='row'>
                        <button className='col customBtn' onClick={() => {
                            setShowPriceCheck(true);
                            }}>Price check</button>
                        <button className='col customBtn' onClick={() => setShowPayout(true)}>Payout</button>
                        <button disabled={items.length === 0 || transType === 'refund'} className='col customBtn'
                        onClick={() => {
                            saveTrans(transactionState);
                            dispatch(clearTrans());
                        }}
                        >Save transaction</button>
                    </div>
                    <div className='row'>
                        <button className='col customBtn' onClick={() => {setShowSavedTrans(true); getSavedTrans()}}>Saved transactions</button>
                        <button className='col customBtn' onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'Hide Keboard' : 'Show Keyboard'}</button>
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
                        transType === 'transaction' ? dispatch(updateItem(currItem.barcode, newQty)) :
                        dispatch(updateItemRefund(currItem.barcode, newQty));
                        setTaxable(true);
                        setShowEdit(false);
                        }}>
                        Update
                    </button>
                    <button className='btn btn-lg btn-danger' onClick={() => {
                        transType === 'transaction' ? dispatch(removeItem(currItem.barcode)) :
                        dispatch(removeItemRefund(currItem.barcode));
                        setTaxable(true);
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
                        <input ref={discountRef} type='number' min="1" max="100" className='form-control customInput'  onChange={(e) => setCurrDiscount(e.target.value)}/>
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
            <Modal show={showPriceCheck} onHide={() => setShowPriceCheck(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Price Check</Modal.Title>
                </Modal.Header>
                    <div className='row m-2'>
                        <input ref={priceCheckRef} type='text' value={checkItemBarcode} className='form-control customInput' placeholder='Scan Item' onChange={(e) => {
                            setCheckItemBarcode(e.target.value);
                        }} onKeyPress={event => {
                            if (event.key === 'Enter') {
                                const itemRes = prod.filter(item => item.barcode === checkItemBarcode);
                                setCheckItem(itemRes);
                                setCheckItemBarcode('');
                            }
                        }}/>
                    </div>
                   
                    {
                        checkItem.length > 0 ? 
                        <div className='row m-2'>
                            <div className='col'>
                                <h4>Item: </h4>
                                <h6>{checkItem[0].name}</h6>
                            </div>
                            <div className='col'>
                                <h4>Price: </h4>
                                <h6>${checkItem[0].price.toFixed(2)}</h6>
                            </div>
                           
                        </div> : ''
                    }
                    
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => {
                        setShowPriceCheck(false);
                        setCheckItem('');
                        }}>
                        Close
                    </button>
                    <button className='btn btn-lg btn-success' onClick={() => {
                        dispatch(addItem(checkItem[0]));
                        setShowPriceCheck(false);
                        setCheckItem('');
                        }}>
                        Buy Item
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showNonUpc} onHide={() => {setShowNonUpc(false); setNonUpcItems(prod);}}>
                <Modal.Header closeButton>
                    <Modal.Title>Non-UPC items</Modal.Title>
                </Modal.Header>
                <Modal.Body>{currItem.name}</Modal.Body>
                    <div className='row'>
                        <label className='nonUpcLabel'>Search products:</label>
                        <input ref={nonUpcRef} type='text' className='form-control nonUpcInput' placeholder='Item name' onChange={(e) =>{ 
                            const searchRes = prod.filter(i => i.name.toLowerCase().includes(e.target.value))
                            setNonUpcItems(searchRes);
                        }
                        }/>
                    </div>
                    <table className="table customTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nonUpcItems.map(item => (
                                    <tr className='customTr' key={item.product_id} onClick={() => {
                                            dispatch(addItem(item));
                                            setShowNonUpc(false);
                                            setNonUpcItems(prod);
                                        }}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => {
                        setShowNonUpc(false);
                        setNonUpcItems(prod);
                        }}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSavedTrans} onHide={() => setShowSavedTrans(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Saved transactions</Modal.Title>
                </Modal.Header>
                {   savedTrans.length === 0 ? <p className='customP'>No saved transactions</p> :
                    <table className="table customTable">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedTrans.map(item => (
                            <tr className='customTr' key={savedTrans.indexOf(item)} onClick={() => {
                                    removeSavedTrans(savedTrans.indexOf(item));
                                    setShowSavedTrans(false);
                                }}>
                                <td>{item.qty}</td>
                                <td>${item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => {
                        setShowSavedTrans(false);
                        }}>
                        Close
                    </button>
                    <button className='btn btn-lg btn-danger col-md-4' onClick={() => {
                        clearSavedTrans();
                        setSavedTrans([]);
                        setShowSavedTrans(false);
                        }}>
                        Clear
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showPayout} onHide={() => setShowPayout(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payout</Modal.Title>
                </Modal.Header>
                        <input className='payoutInput' placeholder='Vendor'/>
                        <input className='payoutInput' placeholder='Invoice#'/>
                        <input className='payoutInput' placeholder='Amount'/>
                <Modal.Footer>
                    <button className='btn btn-lg btn-primary col-md-4' onClick={() => {
                        setShowPayout(false);
                        }}>
                        Close
                    </button>
                    <button className='btn btn-lg btn-danger col-md-4' onClick={() => {
                        setShowPayout(false);
                        }}>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
            {isVisible && <Keyboard /> }
        </div>
    );
}

export default POS;
