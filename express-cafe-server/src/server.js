const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();

// Middleware to enable CORS and parse JSON requests
app.use(cors());
app.use(express.json());

// MongoDB connection URI from environment variables
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('MONGO_URI is not defined in the environment variables.');
}

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('MongoDB connected');

    // Specify the database to use
    const database = client.db('express-cafe-DB'); 
    // Specify the collection to use within the database
    const coffeesCollection = database.collection('coffees');

    // Add Coffee route to receive and save form data
    app.post('/coffee', async (req, res) => {
      const { name, quantity, details, photo } = req.body;
      console.log('Received coffee data:', { name, quantity, details, photo });

      // Create a coffee object to insert
      const coffee = { name, quantity, details, photo };

      try {
        // Insert the coffee object into the MongoDB collection
        const result = await coffeesCollection.insertOne(coffee);
        console.log(`New coffee inserted with the following id: ${result.insertedId}`);
        res.status(201).json(result); // Respond with the result of the insertion
      } catch (error) {
        console.error('Error inserting coffee:', error);
        res.status(500).json({ message: 'Failed to save coffee data' }); // Respond with an error message
      }
    });

    // Sample route to verify the server is running
    app.get('/', (req, res) => {
      res.send('Express Cafe API');
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Express Cafe Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

// Run the MongoDB connection function
run().catch(console.dir);
