var db = require('../db');
var express = require('express');
const fs = require('fs');
const https = require('https');
var app = express();
var port = process.env.PORT || 4000;
var path = require('path');
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};


//serve the index.html file from the build directory
app.use('/',express.static(path.join(__dirname, '../../build')));

//create post route for the settings
app.post('/settings', function (req, res) {
  db.post(req.body.user, req.body.presetName, req.body).then(function (result) {
    res.send(result);
  }
  ).catch(function (err) {
    res.send(err);
  })
})
//create get route for the settings
app.get('/settings', function (req, res) {
  db.get().then(function (data) {
    res.send(data);
  })
}
)
//create delete route for the settings
app.delete('/settings/:id', function (req, res) {
  db.delete(req.params.id).then(function (result) {
    res.send(result);
  })

})

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      options
    },
    app
  )
  .listen(4000, () => {
    console.log("serever is runing at port 4000");
  });
