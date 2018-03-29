// Dependencies for DB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose product schema
const userSchema = new Schema({
  _id: String,
  name: String,
  connections: Schema.Types.Mixed
}, {_id: false});

// Export model
module.exports = mongoose.model('User', userSchema);