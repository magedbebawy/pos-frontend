import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateStore() {

    const [ storeName, setStoreName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ tax, setTax ] = useState('');

    const URL = 'http://localhost:3000';
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const data = {
        //         userid,
        //         password
        //     }

        //     const apiResponse = await fetch(`${URL}/user/admin/signin`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     const response = await apiResponse.json();
        //     console.log(response);
        //     if(apiResponse.ok) {
        //         dsipatch(adminSignin());
        //         navigate('/');
        //         toast.success('Signed in');
        //     } else {
        //         toast.error('Invalid user name or password');
        //     }
        //     localStorage.setItem('token', response.data.token);

        //     console.log(signedIn);
        // } catch (err) {

        //     console.log(err);
        // }
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="p-4" style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}>
                        <h2 className="mb-4">Add store</h2>
                        <form>
                        <div className="form-group m-4">
                                <input type="text" className="form-control" 
                                onChange={(e) => setStoreName(e.target.value)}
                                value={storeName} placeholder="Store name" />
                            </div>
                            <div className="form-group m-4">
                                <input type="address" className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address} placeholder="Address" />
                            </div>
                            <div className="form-group m-4">
                                <input type="phone" className="form-control"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone} placeholder="Phone" />
                            </div>
                            <div className="form-group m-4">
                                <input type="number" className="form-control"
                                onChange={(e) => setTax(e.target.value)}
                                value={tax} placeholder="Tax rate" />
                            </div>
                            <button type="submit" className="btn btn-primary m-4" onClick={handelSubmit}>Create store</button>
                            <button type="submit" className="btn btn-danger m-4" onClick={handelSubmit}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStore;
