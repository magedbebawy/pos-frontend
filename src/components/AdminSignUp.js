import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [ name, setName ] = useState('');
    const [ userid, setUserid ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const [ errors, setErrors ] = useState(false);
    const navigate = useNavigate();
    const URL = 'http://localhost:3000';

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const data = {
                name, userid, email, password
            }
            console.log(data);
            const apiRes = await fetch(`${URL}/user/admin/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(await apiRes.json());   
            if(apiRes.ok) {
                navigate('/admin/signin');
            }else{
                setErrors(true);
            }
        } catch (err) {
            console.log(err);
            setErrors(true);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="p-4" style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}>
                        <h2 className="mb-4">Sign Up</h2>
                        <form>
                            <div className="form-group m-4">
                                <input 
                                    type="text" value={name} 
                                    className="form-control" placeholder="Full Name" 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group m-4">
                                <input 
                                    type="text" value={userid}
                                    className="form-control" placeholder="User ID" 
                                    onChange={(e) => setUserid(e.target.value)}
                                />
                            </div>
                            <div className="form-group m-4">
                                <input 
                                    type="email" value={email} 
                                    className="form-control" placeholder="Email" 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group m-4">
                                <input 
                                    type="password" value={password} 
                                    className="form-control" placeholder="Password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group m-4">
                                <input 
                                    type="password" value={confirmPass} 
                                    className="form-control" placeholder="Confirm Password" 
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" className="btn btn-primary m-4"
                                onClick={handleSubmit}
                                disabled={!name || !userid || !email || !password || (password !== confirmPass)}
                            >Sign Up</button>
                            {errors && <p style={{ color: 'red', marginLeft: '20px' }}>Error signing up</p>}
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
