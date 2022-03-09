var express = require('express');
var cors = require('cors')
var app = express();
var fs = require("fs");

app.use(cors({credentials: true, origin: true}))

const mongoose = require("mongoose");
const votingCandidate = require("./model");

// the url string length is getting clipped
// var uri = process.env.MONGO_DB;
console.log('Mongo DB url from env : ' + process.env.MONGO_DB);
var uri = 'mongodb://srahul3aksmdb2:JeeWrEXKBGoyMcJwNXRAXB5CtzbwwGmYoEmVlvY3Ms93qNPD64mNKizv7hT5BBvOVZPn31M5tmNsVqux2GxMsQ%3D%3D@srahul3aksmdb2.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@srahul3aksmdb2@';
console.log('Mongo DB url: ' + uri);
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

/**
 * Vote for a candidate
 */
app.patch('/vote/:teamid', function (req, res) {   
   var query = {'id': req.params.teamid};
   
   votingCandidate.findOneAndUpdate(query, {$inc: {votes: 1}}, {upsert: true}, function(err, doc) {
      if (err) {
         console.log(err);
         return res.json(500, {error: err, status: 'error'});
      }

      return res.json({status: 'success'});
   });   
})

app.get('/voting', function (req, res) {
   console.log( "voting data" );
   votingCandidate.find({}, function(err, result) {
      if (err) {
         console.log(result);
         return res.json(500, {error: err}); 
      } else {
        res.json(result);
      }
    });  
})

/**
 * A bootstarp data to start with
 */
app.put('/bootstrap', function (req, res) {
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

  // Writing the bootstrap data to DB
  votingCandidate.insertMany(data, function(err, result) {
      if (err) {
         console.log(result);
         return res.json(500, {error: err});         
      } else {
         res.jsonp(result);
      }
   });   
})

/**
 * This helps Azure Application gateway to keep watch on this application's health
 */
app.get("*", function (req, res) {
   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
   res.status(200).send('welcome: ' + fullUrl);
});

/**
 * Starting the rest application server
 */
var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
