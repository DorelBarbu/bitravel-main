const mongoose = require('mongoose');

var GraphSchema = new mongoose.Schema({
  edges: {
    type: Array,
    required: true
  },
  cityToIndex: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Graph', GraphSchema);