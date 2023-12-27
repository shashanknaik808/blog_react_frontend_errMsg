import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogDetail() {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
    });

    async function fetchDetails(id) {
        try {
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
            const data = res.data;
            return data;
        } catch (err) {
            console.log('Data not getting', err);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const idArr = document.URL.split('/');
            let id = idArr[idArr.length - 1];

            const data = await fetchDetails(id);
            if (data) {
                setInputs({
                    title: data.blog.title,
                    description: data.blog.description,
                    image: data.blog.image,
                });
            }
        };

        fetchData();
    }, []);

    async function sendRequest(id) {
        const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('image', inputs.image, inputs.image.name);

        try {
            const res = await axios.put(
                `http://localhost:5000/api/blog/update/${id}`,
                formData
            );
            const data = res.data;
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const handleChange = (e) => {
        setInputs((prevInputs) => {
            if (!e.target.files || Object.keys(e.target.files).length === 0) {
                return {
                    ...prevInputs,
                    [e.target.name]: e.target.value,
                };
            }

            return {
                ...prevInputs,
                [e.target.name]: e.target.value,
                image: e.target.files[0],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];
        sendRequest(id)
            .then((data) => console.log(data))
            .then(() => {
                window.location.replace('/myBlogs');
            })
            .catch(() => console.log('Can not update'));
    };

    return (
        <>
            <header
                className="masthead"
                style={{ backgroundImage: `url('http://localhost:5000${inputs.image}')` }}
            >
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="page-heading">
                                <h1>{inputs.title}</h1>
                                <span className="subheading">{inputs.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Post Content*/}
            {inputs && (
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
                                        value={inputs.title}
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
                                        value={inputs.description}
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

                                {/* Submit Button*/}
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="submitButton"
                                        className="btn btn-primary text-uppercase"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BlogDetail;
