import React, { Component } from 'react';
import AuthService from './AuthService';
import BackendAPI from './BackendAPI';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { token: '', backend: '' };
    
    
    // this.Auth = new AuthService();
    // this.Auth.request()
    //     .then(res =>{
    //       //console.log(res);
    //       this.BackendAPI = new BackendAPI();
    //       this.BackendAPI.request(res.user_id)
    //         .then(respBackend => {
    //           this.respBackend = respBackend;
    //         }).catch(errBackend =>{
    //           console.log(errBackend);
    //         });
    //     })
    //     .catch(err =>{
    //       console.log(err);
    //     })
  }

  async componentDidMount() {
    try {
      const request = await fetch('/.auth/me');
      const response = await request.json();
      const jsonString = JSON.stringify(response)
      console.log('String: ' + jsonString);
      const jsonArray = JSON.parse(jsonString)
      console.log('Array: '+ jsonArray);
      var id_token =jsonArray[0].id_token;
      console.log('Token: '+ id_token);
      this.setState({ token: jsonArray[0].id_token });
      if (jsonArray!=undefined) {
        console.log('Array has content');
        fetch('https://www.w3.org/TR/PNG/iso_8859-1.txt').then(response => this.setState({ backend: response.data })).catch();
        //let headers = { "Authorization": "Bearer " + id_token };
        //fetch(url, { headers,options })
         // .then(this._checkStatus)
          //.then(response => response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Token from Azure AD: { this.state.token }
        </p>
        <p className="App-intro">
          Values from Backed: { this.state.backend }
        </p>
      </div>
    );
  }

}

export default App;
