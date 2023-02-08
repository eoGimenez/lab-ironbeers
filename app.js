const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname + "/views/partials"))

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beer', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => { 
    let beersObj = {
      beers: beersFromApi
    }
    res.render('beer', beersObj )
  })
  .catch(error => console.log(error));
});

app.get('/randombeer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    let randomObj = {
      random: responseFromAPI
    }
    res.render('random-beer', randomObj);
  })
  .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res ) => {
  let beerId = req.params.id;
  punkAPI
  .getBeer(beerId)
  .then(beerSelected => {
    console.log(beerSelected)
    res.render('partials/beerpartials', beerSelected[0])
  })
});
 

app.listen(3000, () => console.log('🏃‍ on port 3000'));
