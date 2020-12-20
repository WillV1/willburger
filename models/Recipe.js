const mongoose = require('mongoose');
const recipientSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  ingredients
})