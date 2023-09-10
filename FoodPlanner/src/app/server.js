const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kejsibilani:local1234@cluster0.xxwxhgv.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.static(path.join(__dirname, '../dist/food-planner')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/food-planner/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});