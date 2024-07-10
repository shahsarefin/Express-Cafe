const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Username and Password from .env file
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

// Log MongoDB Username and Password to console to confirm it works
console.log(username, password);


// Connection URI
const uri = `mongodb+srv://${username}:${password}@cluster0.ypafhvm.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Sample route
app.get('/', (req, res) => {
  res.send('Express Cafe API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Express Cafe Server running on port ${PORT}`));
