if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://avick:PtCdNNKxdQmXjtHf@cluster0.jxchlqx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);