const express = require("express");
const mongodb = require("../data/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

/* =========================
   GET ALL AUTHORS
========================= */
router.get("/", async (req, res) => {
  try {
    const db = mongodb.getDb();
    const authors = await db.collection("authors").find().toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET ONE AUTHOR
========================= */
router.get("/:id", async (req, res) => {
  try {
    const db = mongodb.getDb();
    const authorId = new ObjectId(req.params.id);

    const author = await db
      .collection("authors")
      .findOne({ _id: authorId });

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   CREATE AUTHOR
========================= */
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create an author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - nationality
 *               - age
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Missing fields
 */
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, nationality, age } = req.body;

    if (!firstName || !lastName || !nationality || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = mongodb.getDb();

    const newAuthor = { firstName, lastName, nationality, age };

    const result = await db.collection("authors").insertOne(newAuthor);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   UPDATE AUTHOR
========================= */
router.put("/:id", async (req, res) => {
  try {
    const db = mongodb.getDb();
    const authorId = new ObjectId(req.params.id);

    const { firstName, lastName, nationality, age } = req.body;

    if (!firstName || !lastName || !nationality || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedAuthor = { firstName, lastName, nationality, age };

    await db.collection("authors").replaceOne(
      { _id: authorId },
      updatedAuthor
    );

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   DELETE AUTHOR
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const db = mongodb.getDb();
    const authorId = new ObjectId(req.params.id);

    await db.collection("authors").deleteOne({ _id: authorId });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;