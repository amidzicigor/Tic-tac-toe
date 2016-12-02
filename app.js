const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
})