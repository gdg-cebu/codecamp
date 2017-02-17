const fs = require('fs');
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
app.use('/sw.js', express.static(path.join(__dirname, 'static', 'javascripts', 'sw.js')));

app.get('/', (req, res) => {
  Promise.all([
    readData(path.join(__dirname, 'data', 'speakers.json')),
    readData(path.join(__dirname, 'data', 'schedule.json')),
    readData(path.join(__dirname, 'data', 'sponsors.json'))
  ]).then(data => {
    const context = {
      eventMapUrl: getStaticMapUrl(),
      speakers: data[0].sort(_ => Math.random() - 0.5),
      events: data[1],
      sponsors: data[2]
    }
    res.render('index.html', context);
  });
});

app.get('/faqs', (req, res) => {
  readData(path.join(__dirname, 'data', 'faqs.json')).then(faqs => {
    const context = { faqs };
    res.render('faqs.html', context)
  });
});

app.get('/coc', (req, res) => res.render('coc.html'));


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


function readData(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(body));
    });
  });
}


module.exports = app;
