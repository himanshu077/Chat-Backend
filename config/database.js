// database.js
const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URL;

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL);

    mongoose.connection.on('connected', () => {
      let dbStatus = `*    DB Connection: OK\n****************************\n`;
      if (process.env.NODE_ENV !== 'test') {
        // Prints initialization
        console.log('****************************');
        console.log('*    Starting Server');
        console.log(`*    Port: ${process.env.PORT || 3000}`);
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`*    Database: MongoDB`);
        console.log(dbStatus);
      }
    });

    mongoose.connection.on('error', (err) => {
      console.error('* Error connecting to DB:', err);
    });

    mongoose.connection.on('disconnected', connect);
  };

  connect();
};
