const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Review = require('../models/Review');

// @route   GET api/reviews
// @desc    Get all user reviews
// @access  Private
// solo las del usuario: const reviews = await Review.find({ user: req.user.id }).sort({ creationDate: -1 });
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const reviews = await Review.find().sort({ creationDate: -1 });
      res.json(reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/reviews
// @desc    Add new review
// @access  Private
// OJO SI ME SIRVE EL USER.ID DE LA NEW REVIEW porque necesita aparecer en la página.
router.post(
  '/',
  [
    auth,
    [
      check('movieName', 'The movie name is required').not().isEmpty(),
      check('movieYear', 'The movie year is required').not().isEmpty(),
      check('reviewTitle', 'The review title is required').not().isEmpty(),
      check('reviewText', 'The review paragraph is required').not().isEmpty(),
      check('reviewRate', 'The review rate is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      movieName,
      movieYear,
      reviewTitle,
      reviewText,
      reviewRate
    } = req.body;

    try {
      const newReview = new Review({
        movieName,
        movieYear,
        reviewTitle,
        reviewText,
        reviewRate,
        user: req.user.id
      });

      const review = await newReview.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/reviews/:id
// @desc    Update review
// @access  Private
router.put(
  '/:id',
  auth,
  async (req, res) => {
    const {
      movieName,
      movieYear,
      reviewTitle,
      reviewText,
      reviewRate,
    } = req.body;

    // Build review object
    const reviewFields = {};
    if (movieName) reviewFields.movieName = movieName;
    if (movieYear) reviewFields.movieYear = movieYear;
    if (reviewTitle) reviewFields.reviewTitle = reviewTitle;
    if (reviewText) reviewFields.reviewText = reviewText;
    if (reviewRate) reviewFields.reviewRate = reviewRate;
    reviewFields.lastModDate = new Date();

    try {
      let review = await Review.findById(req.params.id);

      if (!review) return res.status(404).json({ msg: 'Review not found' });

      // Make sure user owns review
      if (review.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      review = await Review.findByIdAndUpdate(req.params.id,
        { $set: reviewFields },
        { new: true }
      );

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      let review = await Review.findById(req.params.id);

      if (!review) return res.status(404).json({ msg: 'Review not found' });

      // Make sure user owns review
      if (review.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      await Review.findByIdAndRemove(req.params.id);

      res.json({ msg: "Review Removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;