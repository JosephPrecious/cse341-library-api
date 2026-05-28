const express = require("express");
const mongodb = require("../data/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { ensureAuth } = require("../middleware/auth");

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/",  ensureAuth, async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db.collection("books").find().toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get one book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const db = mongodb.getDb();

    const bookId = new ObjectId(req.params.id);

    const result = await db
      .collection("books")
      .findOne({ _id: bookId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *               pages:
 *                 type: number
 *               language:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", ensureAuth, async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      year,
      pages,
      language,
      available
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !year ||
      !pages ||
      !language ||
      available === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const book = {
      title,
      author,
      genre,
      year,
      pages,
      language,
      available
    };

    const response = await db
      .collection("books")
      .insertOne(book);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - year
 *               - pages
 *               - language
 *               - available
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *               pages:
 *                 type: number
 *               language:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Book updated successfully
 */
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      year,
      pages,
      language,
      available
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !year ||
      !pages ||
      !language ||
      available === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const bookId = new ObjectId(req.params.id);

    const updatedBook = {
      title,
      author,
      genre,
      year,
      pages,
      language,
      available
    };

    await db.collection("books").replaceOne(
      { _id: bookId },
      updatedBook
    );

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const db = mongodb.getDb();

    const bookId = new ObjectId(req.params.id);

    await db.collection("books").deleteOne({
      _id: bookId
    });

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;