const express = require("express");
const router = express.Router();
const WrapAsnc = require("../utils/WrapAsnc");
const passport = require("passport");
const { saveRedirtUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

// for signUp
router
  .route("/signup")
  .get(userController.signUp)
  .post(WrapAsnc(userController.signUpPost));

// for logIn
router
  .route("/login")
  .get(userController.logIn)
  .post(
    saveRedirtUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logInPost
  );

// logOut
router.get("/logout", userController.logOut);
module.exports = router;
