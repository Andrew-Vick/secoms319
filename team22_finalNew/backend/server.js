var express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const port = process.env.PORT || "8081";
const host = "localhost";

const url =
  "mongodb+srv://avick:PtCdNNKxdQmXjtHf@cluster0.jxchlqx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "reactdata";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function main() {
  try {
    await client.connect();
    console.log("Connected correctly to MongoDB server");
    db = client.db(dbName);
  } catch (err) {
    console.error(err);
    await client.close();
  }
}

main().catch(console.error);
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "..", "images")));


//
//Get Full Data
//
app.get("/FinalData", async (req, res) => {
  try {
    const collection = db.collection("FinalData");
    const { category, name } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    } else if (name) {
      query.name = name;
    }
    const products = await collection.find(query).toArray();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Error fetching data from db" });
  }
});



app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});


//
//Get Item
//
app.get("/:id", async (req, res) => {
  const Itemid = Number(req.params.id);
  console.log("Items to find :", Itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: Itemid };
  const results = await db.collection("FinalData").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});


//
//Add Item
//
app.post("/addItem", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  const category = values[1];
  const name = values[2]; // name
  const company = values[3];
  const price = values[4]; // price
  const keywords = values[5]; // image
  const image = values[6]; // image
  const description = values[7]; // description
  console.log(id, category, name, company, price, keywords, image, description);
  const newDocument = {
    id: id,
    category: category,
    name: name,
    company: company,
    price: price,
    keywords: keywords,
    image: image,
    description: description,
  };
  const results = await db.collection("FinalData").insertOne(newDocument);
  res.status(200);
  res.send(results);
});


//
//Delete Item
//
app.delete("/deleteItem", async (req, res) => {
  try {
    await client.connect();
    const values = Object.values(req.body);
    const id = values[0];
    const query = { id: id };
    const results = await db.collection("FinalData").deleteOne(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
});


//
//Update Item (Price)
//
app.put("/updateItem/:id", async (req, res) => {
  try {
    await client.connect();

    const id = parseInt(req.params.id);
    const newPrice = req.body.newPrice;

    if (!id || !newPrice) {
      res.status(400).json({ error: "Missing required parameters" });
      return;
    }

    const filter = { id: id };
    const update = { $set: { price: newPrice } };

    const result = await db.collection("FinalData").updateOne(filter, update);

    if (result.modifiedCount === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json({ message: "Price updated successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating item price" });
  }
});
