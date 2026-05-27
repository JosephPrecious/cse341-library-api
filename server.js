const express = require("express");
const mongodb = require("./data/database");
const swaggerDocs = require("./swagger");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

const booksRoutes = require("./routes/books");
const authorsRoutes = require("./routes/authors");

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Library API");
});

app.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }

    res.send("Logged out");
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});

swaggerDocs(app);