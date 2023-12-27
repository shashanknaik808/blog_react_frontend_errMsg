import axios from 'axios';
import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
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
            ...prevState,
            inputs: {
                ...prevState.inputs,
                [e.target.name]: e.target.value,
            },
        }));
    }

    async sendRequest() {
        let res;

        try {
            res = await axios.post('http://localhost:5000/api/user/login', {
                email: this.state.inputs.email,
                password: this.state.inputs.password,
            });
        } catch (err) {
            this.props.setLoggedIn(false);

            this.setState((prevState) => ({
                ...prevState,
                error: {
                    errFlag: true,
                    errStatus: err.response.request.status,
                    errMsg: err.response.data.message,
                },
            }));
        }

        return res.data; // Directly access the data property
    }

    handleSubmit(e) {
        e.preventDefault();
        this.sendRequest()
            .then((data) => {
                if (data && data.user && data.user._id) {
                    localStorage.setItem('userID', data.user._id);
                    this.props.setLoggedIn(() => ({
                        isLoggedIn: true,
                    }));
                    window.location.replace('/myBlogs');
                } else {
                    console.log('User ID not being set into Local Storage, so chill!!');
                }
            })
            .catch((err) =>
                console.log('User ID not being set into Local Storage, so chill!!')
            );
    }

    componentDidMount() {
        // Reset error to null on page reload
        window.addEventListener('beforeunload', () => {
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    errFlag: false,
                    errStatus: '',
                    errMsg: '',
                },
            }));
        });
    }


    render() {
        return (
            < >
                <header className="masthead" style={{ "backgroundImage": "url('assets/img/post-bg.jpg')" }}>
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
                                    <form action="/auth" method="POST" onSubmit={this.handleSubmit}>

                                        <div className="form-floating">
                                            <input className="form-control" id="email" name="email" type="email" onChange={this.handleChange} value={this.state.email}
                                                placeholder="Type your registed email..." required />
                                            <label htmlFor="email">Email</label>
                                        </div><br />
                                        <div className="form-floating">
                                            <input className="form-control" id="password" name="password" type="password" onChange={this.handleChange} value={this.state.password}
                                                placeholder="Type the password..." required />
                                            <label htmlFor="password">Password</label>
                                        </div><br />
                                        {/* Submit Button*/}
                                        <div style={{ textAlign: 'center' }}>
                                            <button className="btn text-uppercase" id="submitButton" type="submit" style={{ color: 'orange' }}>Submit</button>
                                        </div>

                                        {
                                            (this.state.error.errFlag) &&
                                            <span style={{ 'color': '#dc3545', 'fontWeight': 'bold', 'fontStyle': 'oblique' }}>
                                                &ensp; &ensp; {this.state.error.errMsg} &ensp; &ensp; :  {this.state.error.errStatus}
                                            </span>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Login;