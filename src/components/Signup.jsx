import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: '',
                email: '',
                password: '',
            },
            error: {
                errFlag: false,
                errStatus: '',
                errMsg: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    handleChange(e) {
        this.setState((prevState) => ({
            inputs: {
                ...prevState.inputs,
                [e.target.name]: e.target.value,
            },
        }));
    }

    async sendRequest() {
        let res;

        try {
            res = await axios.post('http://localhost:5000/api/user/signup', {
                name: this.state.inputs.name,
                email: this.state.inputs.email,
                password: this.state.inputs.password,
            });
        } catch (err) {
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    errFlag: true,
                    errStatus: err.response.request.status,
                    errMsg: err.response.data.message,
                },
            }));
        }

        return res ? res.data : null;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.sendRequest()
            .then((data) => {
                if (data && data.user && data.user._id) {
                    localStorage.setItem('userID', data.user._id);
                    this.props.setLoggedIn(true);
                    window.location.replace('/myBlogs');
                } else {
                    console.log('User ID not being set into Local Storage, so chill!!');
                }
            })
            .catch((err) => console.log('There is a mistake in Sign up'));
    }

    render() {
        return (
            <>
                {/* ... (header and main structure) ... */}
                <main className="mb-4">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-7">
                                <div className="my-5">
                                    <form action="/auth/signup" method="POST" onSubmit={this.handleSubmit}>
                                        {/* ... (form fields) ... */}
                                        <div style={{ textAlign: 'center' }}>
                                            <button className="btn text-uppercase" id="submitButton" type="submit" style={{ color: 'orange' }}>
                                                Sign Up
                                            </button>
                                        </div>
                                        {this.state.error.errFlag && (
                                            <span style={{ color: '#dc3545', fontWeight: 'bold', fontStyle: 'oblique' }}>
                                                &ensp; &ensp; {this.state.error.errMsg} &ensp; &ensp; : {this.state.error.errStatus}
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
}

export default Signup;
