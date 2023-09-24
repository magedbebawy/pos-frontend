import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { adminSignin, adminSignout } from '../redux/actions/userActions';

function SignIn() {
    const dsipatch = useDispatch();
    const signedIn = useSelector(state => state.user.signedIn);
    console.log(signedIn);

    const handelSubmit = (e) => {
        e.preventDefault();
        dsipatch(adminSignin());
        console.log(signedIn);
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="p-4" style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}>
                        <h2 className="mb-4">Sign In</h2>
                        <form>
                            <div className="form-group m-4">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group m-4">
                                <input type="password" className="form-control" placeholder="Password" />
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
