const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { extractDataApp } = require('./extractData');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is listen on port ${port}`);
});

app.get('/', (req, res) => {
  extractDataApp.then(res.send.bind(res));
})