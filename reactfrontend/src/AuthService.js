export default class AuthService {
    constructor(domain) {
      this.domain = domain;
    }
    
    request = () => {
      return this.fetch('/.auth/me', {
        method: "GET",
      }).then(res => {
        this.setToken(res.access_token); // Setting the token in localStorage
        return Promise.resolve(res);
      });
    };
  
    loggedIn = () => {
      const access_token = this.getToken();
      return !!access_token && !this.isTokenExpired(access_token); 
    };

    setToken = access_token => {
      localStorage.setItem("access_token", access_token);
    };
  
    getToken = () => {
      return localStorage.getItem("access_token");
    };
  
    logout = () => {
      localStorage.removeItem("access_token");
    };
  
    fetch = (url, options) => {
      return fetch(url, {
        ...options
      })
        .then(this._checkStatus)
        .then(response => response.json());
    };
  
    _checkStatus = response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    };
  }
  