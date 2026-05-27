const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");
const swaggerDocs = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

const contactsRoutes = require("./routes/contacts");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/contacts", contactsRoutes);

app.get("/", (req, res) => {
  res.send("Contacts API Running");
});

// Swagger
swaggerDocs(app);

// DB connection then start server
mongodb.initDb((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});