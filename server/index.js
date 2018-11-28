const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const port = process.env.PORT || 3030;
const api = require('./components/api.router');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use('/api', api);
app.use((req,res) =>{
  res.status(404).send(`Page not found`);
});
app.use((err,req,res) => {
  res.status(500).send(err);
});

app.listen(port, () => console.log(`server running on port ${port}`));
