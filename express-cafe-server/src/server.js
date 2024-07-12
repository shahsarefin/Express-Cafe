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

    // Specify the database and collection to use
    const database = client.db('express-cafe-DB'); 
    const coffeesCollection = database.collection('coffees');

    // get the client data and POST it to database
    app.post('/coffee', async (req, res) => {
      const { name, quantity, details, photo } = req.body;
      console.log('Received coffee data:', { name, quantity, details, photo });

      // Create a coffee object from the received data
      const coffee = { name, quantity, details, photo };

      try {
        // Insert the coffee object into the MongoDB collection
        const result = await coffeesCollection.insertOne(coffee);
        console.log(`New coffee inserted with the following id: ${result.insertedId}`);
        res.status(201).json(result); // successful http response
      } catch (error) {
        console.error('Error inserting coffee:', error);
        res.status(500).json({ message: 'Failed to save coffee data' }); // error http response
      }
    });

    // GET all Coffees from the database and return them as JSON response to the server
    app.get('/coffees', async (req, res) => {
      try {
        const cursor = coffeesCollection.find();
        const coffees = await cursor.toArray();
        res.status(200).json(coffees); // successful http response
      } catch (error) {
        console.error('Error fetching coffees:', error);
        res.status(500).json({ message: 'Failed to fetch coffee data' }); // error http response
      }
    });

    // verify the server is running
    app.get('/', (req, res) => {
      res.send('Express Cafe API');
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Express Cafe Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  } finally {
    // Close the MongoDB connection when the process ends
    process.on('SIGINT', async () => {
      await client.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  }
}

// Run the MongoDB connection function
run().catch(console.dir);
