const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('getUpperCase', (text) => {
  return text.toUpperCase();
});

// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Xpress</h1>');
//   res.send({
//     name: 'Sam',
//     likes:[
//       'Paula',
//       'mas pau'
//     ]
//   })
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our boring website :)'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error:'Ooops, something went wrong'
  })
});

app.listen(port, () => {
  //console.log('Server is up on server 3000');
  console.log(`Server is up on port ${port}`);
});
