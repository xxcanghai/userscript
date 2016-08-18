var express = require('express');
var app = express();


var livereload = require('livereload');
var livereloadServer = livereload.createServer();

app.get('/livereload', function (req, res) {
  res.send('Hello World!');
  livereloadServer.filterRefresh("whatever.js");
  console.log('livereload refresh');
});

app.listen(3700, function () {
  console.log('livereloadServer listen on port 3700!');
});
