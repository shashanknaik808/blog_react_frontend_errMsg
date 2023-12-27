import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        const isLoggedIn = localStorage.length !== 0;

        return (
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link to="/" className="navbar-brand">Blog App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to='/' className="nav-link px-lg-3 py-3 py-lg-4">Home</Link></li>

                            {isLoggedIn &&
                                <>
                                    <li className="nav-item"><Link to='/myBlogs' className="nav-link px-lg-3 py-3 py-lg-4">My Blogs</Link></li>
                                    <li className="nav-item"><Link to='/blog/add' className="nav-link px-lg-3 py-3 py-lg-4">Add Blog</Link></li>
                                    <li className="nav-item"><Link to='/' className="nav-link px-lg-3 py-3 py-lg-4"
                                        onClick={() => {
                                            localStorage.clear();
                                            this.props.setState(false);
                                        }}>Logout</Link></li>
                                </>
                            }

                            {!isLoggedIn &&
                                <>
                                    <li className="nav-item"><Link to='/auth' className="nav-link px-lg-3 py-3 py-lg-4">Login</Link></li>
                                    <li className="nav-item"><Link to="/auth/signup" className="nav-link px-lg-3 py-3 py-lg-4">Sign up</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
