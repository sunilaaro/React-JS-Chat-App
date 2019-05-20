import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        let authId = localStorage.removeItem('token');
        this.state={
            authId
        }

    }
    render() {
        console.log(this.state.authId);
        if (!this.state.authId){
             return <Redirect to="/" />
        }
        
            return (
                <div>
                   <h2>You are logged out!</h2>
                </div>
            );
        }
}



export default Logout;