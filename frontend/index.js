const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
var clients = require('restify-clients');


var client = clients.createJsonClient({
  url: 'https://edisga-nodejs-backend.azurewebsites.net',
  version: '~1.0'
});


app.get('/', function (req, res, next) {
    
    console.log(req.headers);

    if (req.headers['x-ms-token-aad-id-token'] === undefined && req.headers['x-ms-token-aad-access-token']=== undefined) {
      throw new Error("Missing x-ms-token-aad-id-token or x-ms-token-aad-access-token headers");
    }

    var options = {
      path: '/echo/randomname',
      headers: {
        'Authorization': 'Bearer ' + req.headers['x-ms-token-aad-id-token']
      },
    };

    client.get(options, function (err, req, res2, obj) {
        console.log('Server returned: %j', obj);
        if(err){
            console.log(err);
            next(err);
        } else {
            res.send(JSON.stringify(obj));
        }    
      });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


