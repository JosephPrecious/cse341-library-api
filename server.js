const express = require("express");
const mongodb = require("./data/database");
const cors = require("cors");

const booksRoutes = require("./routes/books");
const authorsRoutes = require("./routes/authors");
const swaggerDocs = require("./swagger");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

app.get("/", (req, res) => {
  res.send("Library API Running");
});

// Swagger
swaggerDocs(app);

// DB + Server start
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});