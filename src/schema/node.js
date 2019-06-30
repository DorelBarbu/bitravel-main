const mongoose = require('mongoose');

var NodeSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Node', NodeSchema);