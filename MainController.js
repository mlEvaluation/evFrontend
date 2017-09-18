var express = require('express');
var MlApiService = require('./service/MlApiService');
var CurrenciesSnapshot = require('./snapshots/currencies');
var path = require('path');
var app = express();

// Api Controller
app.get('/api/items', MlApiService.getItems);
app.get('/api/items/:id', MlApiService.getDetailItem);

// View Controller
app.get('/', renderIndex);

function renderIndex(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
}

CurrenciesSnapshot.create().then(() => {
  app.set('json spaces', 40);
  app.use(express.static('static'));
  app.listen(8080, function() {
    console.log('Mercadolibre frontend evaluation is running on port 8080. \n\n' +
    '------> APP ENDPOINTS \n' +
    'Home: http://localhost:8080 \n' +
    'Search: http://localhost:8080/#/items?search=iphone 6 \n' +
    'Detail: http://localhost:8080/#/items/MLA632591345 \n\n' +
    '------> API ENDPOINTS \n' +
    'Endpoint search items: http://localhost:8080/api/items \n' +
    'Endpoint detail items: http://localhost:8080/api/items/:id'
    );
  });
}).catch(() => {
  console.error("Sorry, can not start the server.");
})
