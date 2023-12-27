import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login({ setLoggedIn }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        errFlag: false,
        errStatus: '',
        errMsg: '',
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/user/login', {
                email: inputs.email,
                password: inputs.password,
            });
            return res.data;
        } catch (err) {
            setLoggedIn(false);
            setError({
                errFlag: true,
                errStatus: err.response.request.status,
                errMsg: err.response.data.message,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then((data) => {
            if (data && data.user && data.user._id) {
                localStorage.setItem('userID', data.user._id);
                setLoggedIn(true);
                window.location.replace('/myBlogs');
            } else {
                console.log('User ID not being set into Local Storage');
            }
        });
    };

    useEffect(() => {
        const resetError = () => {
            setError({
                errFlag: false,
                errStatus: '',
                errMsg: '',
            });
        };

        // Reset error to null on page reload
        window.addEventListener('beforeunload', resetError);

        return () => {
            window.removeEventListener('beforeunload', resetError);
        };
    }, []);

    return (
        <>
            <header className="masthead" style={{ backgroundImage: "url('assets/img/post-bg.jpg')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="page-heading">
                                <h1>Login Page</h1>
                                <span className="subheading">Login User to View Blogs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="my-5">
                                <form action="/auth" method="POST" onSubmit={handleSubmit}>
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={inputs.email}
                                            placeholder="Type your registered email..."
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            value={inputs.password}
                                            placeholder="Type the password..."
                                            required
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <br />
                                    {/* Submit Button*/}
                                    <div style={{ textAlign: 'center' }}>
                                        <button className="btn text-uppercase" id="submitButton" type="submit" style={{ color: 'orange' }}>
                                            Submit
                                        </button>
                                    </div>

                                    {error.errFlag && (
                                        <span style={{ color: '#dc3545', fontWeight: 'bold', fontStyle: 'oblique' }}>
                                            &ensp; &ensp; {error.errMsg} &ensp; &ensp; : {error.errStatus}
                                        </span>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
