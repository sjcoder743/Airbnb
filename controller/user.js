const User = require("../models/user.js");

module.exports.signUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpPost = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Airbnb");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.logIn = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.logInPost = async (req, res) => {
  req.flash("success", "Welcome back to Airbnb!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("error", "You Logged out...");
    res.redirect("/listings");
  });
};
