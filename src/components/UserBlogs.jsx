import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserBlogs() {
    const [user, setUser] = useState('');

    const sendRequest = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
            return res.data || null;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        const id = localStorage.getItem('userID');
        sendRequest(id).then((data) => setUser(data));
    }, []);

    return (
        <>
            <header className="masthead" style={{ backgroundImage: "url('assets/img/post-bg.jpg')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="page-heading">
                                <h1>Blog of {user && user.name}</h1>
                                <span className="subheading">View my Blogs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {user &&
                            user.blogs &&
                            user.blogs.map((blog, index) => (
                                <div key={index}>
                                    <div className="post-preview">
                                        <Link to={`/blog/${blog._id}`}>
                                            <h2 className="post-title">{blog.title}</h2>
                                            <h3 className="post-subtitle">{blog.description}</h3>
                                        </Link>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBlogs;
