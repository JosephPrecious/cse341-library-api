const express = require("express");
const mongodb = require("./data/database");
const swaggerDocs = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

const booksRoutes = require("./routes/books");
const authorsRoutes = require("./routes/authors");

app.use(express.json());

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

app.get("/", (req, res) => {
  res.send("Library API");
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