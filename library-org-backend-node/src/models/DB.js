const mongoose = require('mongoose');
require('dotenv').config();

const connection = () => {
     mongoose.connect(process.env.DB)
          .then(() => console.log('Connected to MongoDB'))
          .catch(err => console.error('Error connecting to MongoDB:', err));
};

module.exports = connection;
