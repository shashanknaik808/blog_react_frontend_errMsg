import axios from 'axios';
import React, { Component } from 'react'

export class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                title: "",
                description: "",
                image: ""
            }
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    handleChange(e) {
        this.setState(prevState => {

            if (!e.target.files || Object.keys(e.target.files).length === 0) {
                return ({
                    inputs: {
                        ...prevState.inputs,
                        [e.target.name]: e.target.value,
                    }
                })
            }

            return ({
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value,
                    image: e.target.files[0]
                }
            });
        });
    }

    async fetchDetails(id) {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
            .catch(err => console.log("Data not getting"))

        let data = null;
        if (res) {
            data = await res.data;
            console.log(data);
        }
        return data;
    }

    async componentDidMount() {
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];

        this.fetchDetails(id)
            .then(data => this.setState({
                inputs: {
                    title: data.blog.title,
                    description: data.blog.description,
                    image: data.blog.image,
                }
            }))
    }

    async sendRequest(id) {
        const formData = new FormData();
        formData.append('title', this.state.inputs.title);
        formData.append('description', this.state.inputs.description);
        formData.append('image', this.state.inputs.image, this.state.inputs.image.name);

        const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, formData)
            .catch(err => console.log(err))

        let data = null;
        if (res) {
            data = await res.data;
            console.log(data);
        }
        return data;
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.inputs);
        // console.log(this.state.blog);
        const idArr = document.URL.split('/');
        let id = idArr[idArr.length - 1];
        this.sendRequest(id)
            .then(data => console.log(data))
            .then(() => {
                window.location.replace("/myBlogs")
            })
            .catch(() => console.log("Can not update"))
    }


    render() {
        return (
            <>
                <header className="masthead" style={{ "backgroundImage": "url('http://localhost:5000" + this.state.inputs.image + "')" }}>
                    <div className="container position-relative px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-7">
                                <div className="page-heading">
                                    <h1>{this.state.inputs.title}</h1>
                                    <span className="subheading">{this.state.inputs.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Post Content*/}
                {this.state.inputs &&
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-7">
                                <form action="/blogs" method="POST" onSubmit={this.handleSubmit} >
                                    <div className="form-floating">
                                        <input className="form-control" id="title" name="title" type="text"
                                            placeholder="Enter the title..." value={this.state.inputs.title} onChange={this.handleChange} required />
                                        <label htmlFor="title">Title</label>
                                    </div>

                                    <div className="form-floating">
                                        <textarea className="form-control" id="description" name="description"
                                            placeholder="Enter your description here..." value={this.state.inputs.description} onChange={this.handleChange} required></textarea>
                                        <label htmlFor="description">Description</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="image" name="image" type="file"
                                            placeholder="Upload an Image" onChange={this.handleChange} required></input>
                                        <label htmlFor="image">Image</label>
                                    </div><br />

                                    {/* Submit Button*/}
                                    <div style={{ textAlign: 'center' }}>
                                        <button id="submitButton" className="btn btn-primary text-uppercase" type="submit">Update</button>
                                    </div><br />
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default BlogDetail;