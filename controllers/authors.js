const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/*
========================================
GET ALL AUTHORS
========================================
*/
const getAllAuthors = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db
      .collection("authors")
      .find()
      .toArray();

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
GET SINGLE AUTHOR
========================================
*/
const getSingleAuthor = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const authorId = new ObjectId(req.params.id);

    const result = await db
      .collection("authors")
      .findOne({ _id: authorId });

    if (!result) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
CREATE AUTHOR
========================================
*/
const createAuthor = async (req, res) => {
  try {

    const { name, nationality, birthYear, booksWritten } = req.body;

    // VALIDATION
    if (!name || !nationality || !birthYear || booksWritten === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = mongodb.getDb();

    const newAuthor = {
      name,
      nationality,
      birthYear,
      booksWritten
    };

    const response = await db
      .collection("authors")
      .insertOne(newAuthor);

    res.status(201).json({
      message: "Author created",
      id: response.insertedId
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
UPDATE AUTHOR
========================================
*/
const updateAuthor = async (req, res) => {
  try {

    const db = mongodb.getDb();
    const authorId = new ObjectId(req.params.id);

    const { name, nationality, birthYear, booksWritten } = req.body;

    // VALIDATION
    if (!name || !nationality || !birthYear || booksWritten === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedAuthor = {
      name,
      nationality,
      birthYear,
      booksWritten
    };

    const response = await db
      .collection("authors")
      .replaceOne({ _id: authorId }, updatedAuthor);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Author not found" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
DELETE AUTHOR
========================================
*/
const deleteAuthor = async (req, res) => {
  try {

    const db = mongodb.getDb();
    const authorId = new ObjectId(req.params.id);

    const response = await db
      .collection("authors")
      .deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Author deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};