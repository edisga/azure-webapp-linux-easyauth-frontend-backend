export default class BackendAPI {

    constructor(name) {
      this.name = name;
    }
  

    async request(){
      return await this.fetch('https://edisga-nodejs-backend.azurewebsites.net/echo/' + name, {
        method: "GET",
      }).then(res => {
        return Promise.resolve(res);
      });
    };
  
    getToken = () => {
      console.log("Getting token from LocalStorage Backend Controller: " + localStorage.getItem("id_token"));
      return localStorage.getItem("id_token");
    };

    fetch = (url, options) => {
        let headers = { "Authorization": "Bearer " + this.getToken() };
        // headers["Authorization"] = "Bearer " + this.getToken();
        return fetch(url, { headers,options })
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
  