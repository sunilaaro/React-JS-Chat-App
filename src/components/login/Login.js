import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.css';
 class Login extends Component {
   constructor(props){
     super(props)
     const token = localStorage.getItem('token')

     let loggedIn =true
       if(token==null){
           loggedIn=false
       }
     this.state = {
        email:'',
        password:'',
        loggedIn
      }
    
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
   }
   
    usernameChangeHandler(e) {
      this.setState({[e.target.name]: e.target.value});
    }
    usernameSubmitHandler(e) {
      e.preventDefault();
      //this.setState({ email:'' });
      //console.log(this.state);
      const {email, password} = this.state;
      if (email=== 'sunil@gmail.com' && password ==='sv@12345'){
        localStorage.setItem('token', 'dhjfhskjfhjdsfj');
         this.setState({
           loggedIn:true
         })
         //console.log(email)
      }else{
        console.log('Please enter the valid credential');
      }
     
    }

  render() {
    if(this.state.loggedIn=== true){
     return <Redirect to="/main" />
    }
    else{
      console.log('failed');
    }
    
    return (
      <div className="loginApp">
        <h1 style={{textAlign:'center'}}>Login Softvision Chat</h1>
        
          <div>
            <form onSubmit={this.usernameSubmitHandler} className="form-container">
              <div className="userInput">
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.usernameChangeHandler}
                  placeholder="Enter a Email ID..."
                  required />
              </div>
              <div className="userInput">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.usernameChangeHandler}
                  placeholder="Enter a password..."
                  required />
              </div>
              <button type="submit" value="Submit">Submit</button>
            </form>
          </div>
        
      </div>
    )
  }
}
export default Login;