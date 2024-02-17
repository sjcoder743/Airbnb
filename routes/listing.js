const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsnc = require("../utils/WrapAsnc.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudeConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(WrapAsnc(listingController.index))

  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    WrapAsnc(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(WrapAsnc(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    WrapAsnc(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, WrapAsnc(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsnc(listingController.editListing)
);

module.exports = router;
