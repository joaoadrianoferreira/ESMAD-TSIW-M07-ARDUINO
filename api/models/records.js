var mongoose = require('mongoose');

var Record = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('SoundRecords', Record);