const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./server/db/mongoose');
const {Bug} = require('./server/models/bug');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/bugs', (req, res) => {
  res.render('bugs.hbs');
})

app.post('/bugs', (req, res) => {
  var body = _.pick(req.body, ['bug']);
  var bug = new Bug(body);

  bug.save().then(() => {
    res.render('success.hbs');
  }).catch((e) => {
    res.status(400).send('Error');
  })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})
