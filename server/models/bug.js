const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  bug: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
})

var Bug = mongoose.model('Bug', UserSchema);

module.exports = {Bug}
