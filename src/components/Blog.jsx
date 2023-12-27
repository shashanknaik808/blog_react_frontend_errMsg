import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blog() {
    const [blog, setBlog] = useState(null);

    async function fetchDetails(id) {
        try {
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
            const data = res.data;
            return data;
        } catch (err) {
            console.log("Data not getting", err);
            return null;
        }
    }

    async function deleteRequest(id) {
        try {
            const res = await axios.delete(`http://localhost:5000/api/blog/${id}`);
            const data = res.data;
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const handleDelete = () => {
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];
        deleteRequest(id);
    };

    useEffect(() => {
        const fetchData = async () => {
            const idArr = document.URL.split('/');
            let id = idArr[idArr.length - 1];

            const data = await fetchDetails(id);
            if (data) {
                setBlog(data.blog);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {blog === null ? (
                <h1>Loading</h1>
            ) : (
                <div>
                    <header
                        className="masthead"
                        style={{
                            backgroundImage: `url('http://localhost:5000${blog.image}')`,
                        }}
                    >
                        <div className="container position-relative px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <div className="post-heading">
                                        <h1>{blog.title}</h1>
                                        <span className="meta">
                                            Posted by {blog.user.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <article className="mb-4">
                        <div className="container px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <p>{blog.description}</p>
                                    {(blog.user._id === localStorage.getItem('userID')) && (
                                        <>
                                            <div>
                                                <Link to={`/editBlog/${blog._id}`}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <Link to={`/myBlogs`} onClick={handleDelete}>
                                                    <i
                                                        className="fa-solid fa-trash"
                                                        style={{ marginLeft: '20px' }}
                                                    ></i>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            )}
        </>
    );
}

export default Blog;
