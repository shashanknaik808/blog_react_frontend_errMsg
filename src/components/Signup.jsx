import React, { useState } from 'react';
import axios from 'axios';

function Signup({ setLoggedIn }) {
    const [inputs, setInputs] = useState({
        name: '',
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
            const res = await axios.post('http://localhost:5000/api/user/signup', {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });

            return res.data;
        } catch (err) {
            setError({
                errFlag: true,
                errStatus: err.response.request.status,
                errMsg: err.response.data.message,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then((data) => {
                if (data && data.user && data.user._id) {
                    localStorage.setItem('userID', data.user._id);
                    setLoggedIn(true);
                    window.location.replace('/myBlogs');
                } else {
                    console.log('User ID not being set into Local Storage, so chill!!');
                }
            })
            .catch(() => console.log('There is a mistake in Sign up'));
    };

    return (
        <>
            {/* ... (header and main structure) ... */}
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="my-5">
                                <form action="/auth/signup" method="POST" onSubmit={handleSubmit}>
                                    {/* ... (form fields) ... */}
                                    <div style={{ textAlign: 'center' }}>
                                        <button className="btn text-uppercase" id="submitButton" type="submit" style={{ color: 'orange' }}>
                                            Sign Up
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

export default Signup;
