import React, { Component } from 'react';
// import Home from './Home';

export class Logout extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.setLoggedIn(false);
        window.location.replace("/")
        localStorage.clear();

    }

    render() {
        return (
            <div onClick={this.handleLogout}>
            </div>
        )
    }
}

export default Logout;