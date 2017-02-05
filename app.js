const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const config = require('./config');


const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'static', 'images', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  const context = {
    eventMapUrl: getStaticMapUrl()
  };
  res.render('index.html', context);
});


function getStaticMapUrl() {
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const latitude = config.get('EVENT_VENUE_LATITUDE');
  const longitude = config.get('EVENT_VENUE_LONGITUDE');
  const query = config.get('GOOGLE_MAPS_CONFIG');
  query['markers'] = `color:red|${latitude},${longitude}`;
  query['center'] = `${latitude},${longitude}`;
  query['key'] = config.get('GOOGLE_MAPS_API_KEY');

  const querystring = Object.keys(query).reduce((qs, key) => {
    qs.push(`${key}=${encodeURIComponent(query[key])}`);
    return qs;
  }, []).join('&');
  return `${baseUrl}?${querystring}`;
}


module.exports = app;
