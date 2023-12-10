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

app.get("/fakestore_catalog", async (req, res) => {
  try {
    const collection = db.collection("fakestore_catalog");
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
  // Do not close the client, it's being reused
});

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});

app.get("/:id", async (req, res) => {
  const Itemid = Number(req.params.id);
  console.log("Items to find :", Itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: Itemid };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addItem", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  const title = values[2]; // title
  const price = values[3]; // price
  const description = values[4]; // description
  const category = values[5]; // image
  const image = values[6]; // image
  const rating = values[7]; // description
  console.log(id, title, price, description, category, image, rating);
  const newDocument = {
    id: id,
    title: title,
    price: price,
    description: description,
    category: category,
    image: image,
    rating: rating,
  };
  const results = await db.collection("fakestore_catalog").insertOne(newDocument);
  res.status(200);
  res.send(results);
});

app.delete("/deleteItem", async (req, res) => {
  try {
    await client.connect();
    const values = Object.values(req.body);
    const id = values[0];
    const query = { id: id };
    const results = await db.collection("fakestore_catalog").deleteOne(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
});

app.put("/editItem", async (req, res) => {
});
