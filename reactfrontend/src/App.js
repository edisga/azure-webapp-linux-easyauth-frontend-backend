import React, { Component } from 'react';
import AuthService from './AuthService';
import BackendAPI from './BackendAPI';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.Auth = new AuthService();
    this.BackendAPI = new BackendAPI();
    this.Auth.request()
        .then(res =>{
          console.log(res);
          this.BackendAPI.request()
            .then(respBackend => {
              console.log(respBackend);
            }).catch(errBackend =>{
              console.log(errBackend);
            });
        })
        .catch(err =>{
          console.log(err);
        })
  }
  componentWillMount(){
    if(this.Auth.loggedIn())
        console.log('Token is already saved');
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

}

export default App;
