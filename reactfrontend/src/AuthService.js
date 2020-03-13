export default class AuthService {
    constructor(domain) {
      this.domain = domain;
      
    }
    
    async request() {
      const response = await this.fetch('/.auth/me');
      const json = await response.json();
      this.setToken(json.id_token)
      return json;

      // return await this.fetch('/.auth/me', {
      //   method: "GET",
      // }).then(res => {
      //   if(res!=undefined){
      //     this.setToken(res.id_token); // Setting the token in localStorage
      //     //console.log("Setting token to LocalStorage: " + res.id_token)
      //   } 
      //   return Promise.resolve(res);
      // });
    };
  
    //loggedIn = () => {
      //const access_token = this.getToken();
      //return !!access_token && !this.isTokenExpired(access_token); 
    //};

    setToken(idtoken) {
      localStorage.setItem("id_token", idtoken);
    };
  
    getToken = () => {
      console.log("Getting token from LocalStorage: " + localStorage.getItem("id_token"));
      return localStorage.getItem("id_token");
    };
  
    logout = () => {
      localStorage.removeItem("id_token");
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
  