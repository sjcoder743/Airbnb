const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsnc = require("../utils/WrapAsnc.js");
const Review = require("../models/review.js");
const modelListing = require("../models/listing.js");
const reviewController = require("../controller/review.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// post reviews route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsnc(reviewController.postReviewRoute)
);

// review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsnc(reviewController.destroyRoute)
);

module.exports = router;
