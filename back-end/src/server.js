import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import "dotenv/config";

async function Start() {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.fpmji.mongodb.net/`;
  const client = new MongoClient(url);

  await client.connect();
  const database = client.db("fsv-db");

  const app = express();
  app.use(express.json());

  app.use("/images", express.static(path.join(__dirname, "../assets")));

  app.use(express.static(path.resolve(__dirname, "../dist"), { maxAge: "1y", etag: false }));

  async function populatedCartIds(ids) {
    return Promise.all(ids.map((id) => database.collection("products").findOne({ id })));
  }

  app.get("/api/products", async (req, res) => {
    const products = await database.collection("products").find({}).toArray();
    res.json(products);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const product = await database.collection("products").findOne({ id: req.params.productId });
    res.json(product);
  });

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await database.collection("users").findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/api/users", async (req, res) => {
    const user = await database.collection("users").find({}).toArray();
    res.json(user);
  });

  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await database.collection("users").findOne({ id: userId });
    res.json(user);
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
    const productId = req.body.id;
    const userId = req.params.userId;

    await database.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId },
      }
    );
    const user = await database.collection("users").findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.post("/api/signinstatus", async (req, res) => {
    const userId = req.body.id;
    const signIn = req.body.signInStatus;
    const user = await database.collection("users").findOne({ id: userId });
    await database.collection("users").updateOne(user, {
      $set: { signInStatus: signIn },
    });
    const updatedUser = await database.collection("users").findOne({ id: userId });
    res.json(updatedUser);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    await database.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );
    const user = await database.collection("users").findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

Start();
