const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4
    });

    console.log('MongoDB Connected:', conn.connection.host);

  } catch (error) {
    console.log('\nMAIN ERROR:', error.message);

    if (error.reason && error.reason.servers) {
      console.log('\nINDIVIDUAL SERVER ERRORS:');

      for (const [address, server] of error.reason.servers) {
        console.log('\nServer:', address);
        console.log('Error:', server.error?.message);
        console.log('Error Code:', server.error?.code);
      }
    }

    process.exit(1);
  }
};

module.exports = connectDB;