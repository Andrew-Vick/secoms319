var express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
var fs = require("fs");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || "8081"; 
const host = "localhost";

const url = "mongodb+srv://avick:PtCdNNKxdQmXjtHf@cluster0.jxchlqx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
// app.get("/FinalData", async (req, res) => {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const collection = db.collection("FinalData"); 
//         const products = await collection.find({}).toArray();
//         res.status(200).json(products);
//     } catch (err) {
//         console.log(err.stack);
//         res.status(500).json({ error: 'Error connecting to db' });
//     } finally {
//         await client.close();
//     }
// });
app.get("/FinalData", async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const collection = db.collection("FinalData");
        // Extract the category from query parameters
        const { category } = req.query;
        
        // Build your query based on whether a category was provided
        let query = category ? { category: category } : {};
        
        const products = await collection.find(query).toArray();
        res.status(200).json(products);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ error: 'Error connecting to db' });
    } finally {
        await client.close();
    }
});


app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

