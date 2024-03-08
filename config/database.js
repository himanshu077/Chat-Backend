// database.js
const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGODB_URL; // Use the MongoDB URI from .env file
const dbName = 'your_database_name'; // Replace with your database name

async function connectToDatabase() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Select the database
        const db = client.db(dbName);

        // Return the database connection
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Throw error for handling in the calling function
    }
}

module.exports = connectToDatabase;
