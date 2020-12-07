const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  movieName: {
    type: String,
    required: true
  },
  movieYear: {
    type: String,
    required: true
  },
  reviewTitle: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  reviewRate: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastModDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('review', ReviewSchema);