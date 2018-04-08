var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/config.json');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const cors = require('cors');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

var app = express();

// app.use(logger('dev'));
app.use(logger('combined'));
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
var mongoose = require('mongoose');

// MONGO LAB
mongoose.connect('mongodb://narek1993x:123123@ds121336.mlab.com:21336/bookshop', { useMongoClient: true });

// LOCAL DB
// mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`, {
//   useMongoClient: true,
// })

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// ---->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

// SAVE SESSION CART API
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) { throw err; }

    res.json(req.session.cart);
  })
});

// GET SESSION CART API
app.get('/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

// ----> END SESSIONS SET UP

var Books = require('./models/books.js');

// ---->>> POST BOOKS <<<------
app.post('/books', function (req, res) {
  var book = req.body;

  Books.create(book, function (err, books) {
    if (err) { throw err; }

    res.json(books);
  })
});

// ---->>> GET BOOKS <<<------
app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) { throw err; }

    res.json(books);
  })
});

// ---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', function (req, res) {
  return Books.findById(req.params._id).remove(function (err, books) {
    if (err) { console.log('# API DELETE BOOKS: ', err) }

    res.send({ success: 'true' });
  })
});

// ---->>> UPDATE BOOKS <<<------
app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  // When true returns the updated document
  var options = { new: true };

  Books.findByIdAndUpdate(query, update, options, function (err, books) {
    if (err) { throw err; }

    res.json(books);
  })
});

// ---->>> GET BOOKS IMAGES API <<<------
app.get('/images', function(req, res) {

  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  // READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, function(err, files) {
    if (err) { return console.error(err) };

    // CREATE AN EMPTY ARRAY
    const filesArr = [];
    files.forEach(function(file) {
      filesArr.push({name: file});
    });
    // SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  })

})

// AUTHENTICATION

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);

// END APIs

app.listen(3001, function(err) {
  if (err) { return console.log(err); }

  console.log('API Server is listening on http://localhost:3001');
})
