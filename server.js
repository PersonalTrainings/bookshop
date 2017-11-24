var express = require('express');
var app = express();
var path = require('path');

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('app is listening on port 3000');
})