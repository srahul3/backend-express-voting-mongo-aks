var express = require('express');
var app = express();
var fs = require("fs");

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.get('/bootstrap', function (req, res) {
   console.log( "home page is called" );
   res.end( "{ page: 'bootstrap' }");
})

app.get('/', function (req, res) {
   console.log( "home page is called" );
   res.end( "{ page: 'Home' }");
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
