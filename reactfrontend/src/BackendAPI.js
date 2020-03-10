export default class BackendAPI {
    constructor() {
    }
    
    request = () => {
      return this.fetch('https://edisga-nodejs-backend.azurewebsites.net/echo/randomname', {
        method: "GET",
      }).then(res => {
        return Promise.resolve(res);
      });
    };
  
    getToken = () => {
      return localStorage.getItem("access_token");
    };

    fetch = (url, options) => {
        let headers = {"Authorization": "Bearer " + this.getToken() };
        // headers["Authorization"] = "Bearer " + this.getToken();
        return fetch(url, {
            headers,
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
  