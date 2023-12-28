import React, { useState } from 'react';
import axios from 'axios';

function AddBlogs() {
    const [state, setState] = useState({
        title: '',
        description: '',
        image: '',
        error: {
            errFlag: false,
            errStatus: '',
            errMsg: '',
        },
    });

    function handleChange(e) {
        setState((prevState) => {
            if (!e.target.files || Object.keys(e.target.files).length === 0) {
                return {
                    ...prevState,
                    inputs: {
                        ...prevState.inputs,
                        [e.target.name]: e.target.value,
                    },
                };
            }

            return {
                ...prevState,
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value,
                    image: e.target.files[0],
                },
            };
        });
    }

    async function sendRequest() {
        const formData = new FormData();
        formData.append('title', state.inputs.title);
        formData.append('description', state.inputs.description);
        formData.append('userID', localStorage.getItem('userID'));
        formData.append('image', state.inputs.image, state.inputs.image.name);

        try {
            const res = await axios.post(
                'http://localhost:5000/api/blog/add',
                formData
            );
            return res.data;
        } catch (err) {
            setState((prevState) => ({
                ...prevState,
                error: {
                    errFlag: true,
                    errStatus: err.response.request.status,
                    errMsg: err.response.data.message,
                },
            }));
            return null;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest().then((data) => {
            if (data) {
                window.location.replace('/myBlogs');
            }
        });
    }

    return (
        <>
            <header className="masthead" style={{ backgroundImage: "url('xxxxx')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="page-heading">
                                <h1>{state.inputs.title}</h1>
                                <span className="subheading">{state.inputs.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <form action="/blogs" method="POST" onSubmit={handleSubmit}>
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter the title..."
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="title">Title</label>
                            </div>

                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Enter your description here..."
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    type="file"
                                    placeholder="Upload an Image"
                                    onChange={handleChange}
                                    required
                                ></input>
                                <label htmlFor="image">Image</label>
                            </div>
                            <br />

                            <div style={{ textAlign: 'center' }}>
                                <button
                                    id="submitButton"
                                    className="btn btn-primary text-uppercase"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>

                            {state.error.errFlag && (
                                <span
                                    style={{
                                        color: '#dc3545',
                                        fontWeight: 'bold',
                                        fontStyle: 'oblique',
                                    }}
                                >
                                    &ensp; &ensp; {state.error.errMsg} &ensp; &ensp; :{' '}
                                    {state.error.errStatus}
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBlogs;
