import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null,
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    async fetchDetails(id) {
        try {
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
            const data = res.data;
            return data;
        } catch (err) {
            console.log("Data not getting", err);
            return null;
        }

    }

    async componentDidMount() {
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];

        const data = await this.fetchDetails(id);
        if (data) {
            this.setState({ blog: data.blog });
        }
    }

    async deleteRequest(id) {
        console.log(id);

        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
            .catch(err => console.log(err))

        const data = res.data;
        return data;
    }

    handleDelete() {
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];
        this.deleteRequest(id)
    }

    render() {

        return (
            <>
                {(this.state.blog === null) ? <h1>Loading</h1> :
                    (<div><header className="masthead" style={{ 'backgroundImage': "url('http://localhost:5000" + this.state.blog.image + "')" }}>
                        <div className="container position-relative px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <div className="post-heading">
                                        <h1>{this.state.blog.title}</h1>
                                        <span className="meta">
                                            Posted by  {this.state.blog.user.name}
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
                                        <p>{this.state.blog.description}</p>
                                        {/* <img>{this.state.blog.image}</img> */}
                                        {(this.state.blog.user._id === localStorage.getItem("userID")) && (
                                            <>
                                                <div >
                                                    <Link to={`/editBlog/${this.state.blog._id}`}>
                                                        <i className="fa-solid fa-pen-to-square" ></i>
                                                    </Link>
                                                    <Link to={`/myBlogs`} onClick={this.handleDelete}>
                                                        <i className="fa-solid fa-trash" style={{ marginLeft: "20px" }} ></i>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    )
                }
            </>
        );
    }
}

export default Blog;