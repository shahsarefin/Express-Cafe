const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb'); // Ensure ObjectId is imported

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

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
    await client.connect();
    console.log('MongoDB connected');

    const database = client.db('express-cafe-DB'); 
    const coffeesCollection = database.collection('coffees');

    // Add Coffee route to receive data from client form
    app.post('/coffee', async (req, res) => {
      const { name, quantity, details, photo } = req.body;
      console.log('Received coffee data:', { name, quantity, details, photo });

      const coffee = { name, quantity, details, photo };

      try {
        const result = await coffeesCollection.insertOne(coffee);
        console.log(`New coffee inserted with the following id: ${result.insertedId}`);
        res.status(201).json(result); // successful http response
      } catch (error) {
        console.error('Error inserting coffee:', error);
        res.status(500).json({ message: 'Failed to save coffee data' }); // error http response
      }
    });

    // Get all Coffees from the MongoDB collection
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

    // Delete Coffee route
    app.delete('/coffee/:id', async (req, res) => {
      const coffeeId = req.params.id;
      console.log(`Attempting to delete coffee with id: ${coffeeId}`);
      try {
        const result = await coffeesCollection.deleteOne({ _id: new ObjectId(coffeeId) });
        if (result.deletedCount === 1) {
          console.log(`Coffee with id ${coffeeId} deleted`);
          res.status(200).json({ message: 'Coffee deleted successfully' });
        } else {
          console.log(`No coffee found with id ${coffeeId}`);
          res.status(404).json({ message: 'Coffee not found' });
        }
      } catch (error) {
        console.error('Error deleting coffee:', error);
        res.status(500).json({ message: 'Failed to delete coffee' }); // error http response
      }
    });

    // Sample route to verify the server is running
    app.get('/', (req, res) => {
      res.send('Express Cafe API');
    });

    app.listen(port, () => console.log(`Express Cafe Server running on port ${port}`));
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
