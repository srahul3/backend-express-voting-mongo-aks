var express = require('express');
var cors = require('cors')
var app = express();
var fs = require("fs");

app.use(cors({credentials: true, origin: true}))

const mongoose = require("mongoose");
const votingCandidate = require("./model");

var uri = "mongodb://srahul3-voting-db:grFE2DyiYrxzavKkTA2x5KSOrTUhPP2g7ldKGCUljfJ1Kse9NUGpst4Ada0VKwI3VP3IsZakDSNfxSMNezgtTQ==@srahul3-voting-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@srahul3-voting-db@";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.put('/vote/:teamid', function (req, res) {   
   var query = {'id': req.params.teamid};
   
   votingCandidate.find

   votingCandidate.findOneAndUpdate(query, {$inc: {votes: 1}}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
   });   
})

app.get('/voting', function (req, res) {
   console.log( "voting data" );
   votingCandidate.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });  
})


app.get('/bootstrap', function (req, res) {
   var data = [
      {
          "id": "1",
          "name": "Liverpool F.C.",
          "logoUrl": "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515361_10542.jpg",
          "votes": 0
      },
      {
          "id": "2",
          "name": "FC Barcelona",
          "logoUrl": "https://lh3.googleusercontent.com/OQZi4ckWAs7UrOlZEPefXZgJOcdJuSM5FSH9zqD5rMg6c2MOaxcKpV5IMrb1Tju98fWyNmcI33E4RGb0uC09Ej4W",
          "votes": 0
      },
      {
          "id": "3",
          "name": "Manchester United F.C.",
          "logoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/640px-Manchester_United_FC_crest.svg.png",
          "votes": 0
      }
  ];

  votingCandidate.insertMany(data, function(err, result) {
      if (err) {
      res.send(err);
      } else {
      res.send(result);
      }
   });   
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
