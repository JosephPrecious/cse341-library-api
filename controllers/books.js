const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/*
========================================
GET ALL BOOKS
========================================
*/
const getAllBooks = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db
      .collection("books")
      .find()
      .toArray();

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/*
========================================
GET SINGLE BOOK
========================================
*/
const getSingleBook = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const bookId = new ObjectId(req.params.id);

    const result = await db
      .collection("books")
      .findOne({ _id: bookId });

    if (!result) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/*
========================================
CREATE BOOK
========================================
*/
const createBook = async (req, res) => {
  try {

    const {
      title,
      author,
      genre,
      publishedYear,
      pages,
      language,
      available,
      rating
    } = req.body;

    /*
    ============================
    VALIDATION
    ============================
    */
    if (
      !title ||
      !author ||
      !genre ||
      !publishedYear ||
      !pages ||
      !language ||
      available === undefined ||
      !rating
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const newBook = {
      title,
      author,
      genre,
      publishedYear,
      pages,
      language,
      available,
      rating
    };

    const response = await db
      .collection("books")
      .insertOne(newBook);

    res.status(201).json({
      message: "Book created",
      id: response.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/*
========================================
UPDATE BOOK
========================================
*/
const updateBook = async (req, res) => {
  try {

    const bookId = new ObjectId(req.params.id);

    const {
      title,
      author,
      genre,
      publishedYear,
      pages,
      language,
      available,
      rating
    } = req.body;

    /*
    ============================
    VALIDATION
    ============================
    */
    if (
      !title ||
      !author ||
      !genre ||
      !publishedYear ||
      !pages ||
      !language ||
      available === undefined ||
      !rating
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const updatedBook = {
      title,
      author,
      genre,
      publishedYear,
      pages,
      language,
      available,
      rating
    };

    const response = await db
      .collection("books")
      .replaceOne(
        { _id: bookId },
        updatedBook
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Book not found"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/*
========================================
DELETE BOOK
========================================
*/
const deleteBook = async (req, res) => {
  try {

    const db = mongodb.getDb();

    const bookId = new ObjectId(req.params.id);

    const response = await db
      .collection("books")
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Book deleted"
      });
    } else {
      res.status(404).json({
        message: "Book not found"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};