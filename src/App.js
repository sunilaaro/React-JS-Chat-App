import React, { Component } from 'react';
import './App.css';
import Main from './components/chat/Main';
import Login from './components/login/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter,

} from "react-router-dom";
import Logout from './components/login/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/logout" component={Logout} />
          </Router>
       </div>
      )
   }
}

export default App;
