import React, { Component } from 'react';

export class Header extends Component {

    render() {

        let imageURL = `url('${this.props.banner}')`;
        console.log(imageURL);

        return (
            <>
                <header className="masthead" style={{ "backgroundImage": { imageURL } }}>                    <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="page-heading">
                                <h1>{this.props.heading}</h1>
                                <span className="subheading">{this.props.subHeading}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </header>
            </>
        )
    }
}

export default Header;