require('newrelic');

const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 9000;

app.use('/carousel/:id', express.static(path.join(__dirname, '../public')));

app.get('/photosandcomments/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`http://localhost:3001/photosandcomments/${id}/`)
    .then(house => (res.status(200).send(house.data)))
    .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`server running at: localhost:${port}`);
});