const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

//app.use((req, res, next) => {
//    res.render('maintanance.hbs');
//});

app.use(express.static(__dirname + '/public')); //register middleware

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//handling routing
app.get('/', (req, res) =>{
  res.render('home.hbs',{
      pageTitle: 'Home Page',
      //currentYear: new Date().getFullYear(),
      welcomeMessage: 'Welcome to Home Page'
  }); 
});

app.get('/about', (req, res) => {
   //res.send('About Page'); 
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
});

app.get('/projects', (req, res) => {
   //res.send('About Page'); 
    res.render('projects.hbs', {
        pageTitle: 'Projects',

    });
});

app.get('/bad', (req,res) => {
    res.send({
        Error: 'unable to fetch data'
    });
});

app.listen(port, () =>{
    console.log(`server started on ${port}`);
} );
