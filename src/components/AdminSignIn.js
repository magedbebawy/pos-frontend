import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignin, adminSignout } from '../redux/actions/userActions';
import { toast } from 'react-toastify';

function SignIn() {
    const dsipatch = useDispatch();
    const signedIn = useSelector(state => state.user.signedIn);
    console.log(signedIn);

    const [ userid, setUserID ] = useState('');
    const [ password, setPassword ] = useState('');
    const URL = 'http://localhost:3000';
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userid,
                password
            }

            const apiResponse = await fetch(`${URL}/user/admin/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const response = await apiResponse.json();
            console.log(response);
            if(apiResponse.ok) {
                dsipatch(adminSignin());
                navigate('/');
                toast.success('Signed in');
            } else {
                toast.error('Invalid user name or password');
            }
            localStorage.setItem('token', response.data.token);

            console.log(signedIn);
        } catch (err) {

            console.log(err);
        }
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="p-4" style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}>
                        <h2 className="mb-4">Sign In</h2>
                        <form>
                        <div className="form-group m-4">
                                <input type="text" className="form-control" 
                                onChange={(e) => setUserID(e.target.value)}
                                value={userid} placeholder="User ID" />
                            </div>
                            <div className="form-group m-4">
                                <input type="password" className="form-control" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary m-4" onClick={handelSubmit}>Sign In</button>
                        </form>
                        <div className="mt-3 m-4">
                            Don't have an account? <Link to="/admin/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
