import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="p-4" style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}>
                        <h2 className="mb-4">Sign Up</h2>
                        <form>
                            <div className="form-group m-4">
                                <input type="text" className="form-control" placeholder="Full Name" />
                            </div>
                            <div className="form-group m-4">
                                <input type="email" className="form-control" placeholder="Email" />
                            </div>
                            <div className="form-group m-4">
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary m-4">Sign Up</button>
                        </form>
                        <div className="mt-3 m-4">
                            Already have an account? <Link to="/admin/signin">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
