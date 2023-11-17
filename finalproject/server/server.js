var express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
var fs = require("fs");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || "8081"; // Use the environment variable for port if available
const host = "localhost";

const url = "mongodb+srv://avick:PtCdNNKxdQmXjtHf@cluster0.jxchlqx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
app.get("/api/FinalData", async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const collection = db.collection("FinalData"); // Replace with your collection name
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ error: 'Error connecting to db' });
    } finally {
        await client.close();
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});