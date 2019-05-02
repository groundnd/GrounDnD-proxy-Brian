const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.redirect(`/bookings/${Math.floor(Math.random()* 100)}`));

app.use('/bookings/:roomid', express.static(path.join(__dirname, '../public')));

app.get('/photosandcomments/:accommodationid', (req, res) => {
  axios.get(`http://ec2-18-212-22-157.compute-1.amazonaws.com/photosandcomments/${req.params.accommodationid}`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/bookings/:accommodationid/reserve', (req, res) => {
  axios.get(`http://localhost:3003/bookings/${req.params.accommodationid}/reserve`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/bookings/:accommodationid/reserve/:startDate&:endDate', (req, res) => {
  axios.get(`http://localhost:3003/bookings/${req.params.accommodationid}/reserve/${req.params.startDate}&${req.params.endDate}`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/abodes/:abode_id/reviews', (req, res) => {
  axios.get(`http://localhost:3002/abodes/${req.params.abode_id}/reviews`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/homes/:accommodationid/nearby', (req, res) => {
  axios.get(`http://ec2-54-183-57-67.us-west-1.compute.amazonaws.com/homes/${req.params.accommodationid}/nearby`)
    .then(response => {
      res.send(response.data);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));