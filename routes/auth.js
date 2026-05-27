const express = require("express");
const passport = require("passport");

const router = express.Router();

// LOGIN ROUTE
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GITHUB CALLBACK
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    res.send("GitHub Login Successful");
  }
);

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("Logged out successfully");
  });
});

// CURRENT USER
router.get("/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({
      message: "Not logged in"
    });
  }
});

module.exports = router;