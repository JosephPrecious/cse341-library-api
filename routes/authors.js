const express = require("express");
const mongodb = require("../data/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db.collection("authors").find().toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get one author
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
router.get("/:id", async (req, res) => {
  try {
    const db = mongodb.getDb();

    const authorId = new ObjectId(req.params.id);

    const result = await db
      .collection("authors")
      .findOne({ _id: authorId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

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
    const {
      firstName,
      lastName,
      nationality,
      age
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !nationality ||
      !age
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const author = {
      firstName,
      lastName,
      nationality,
      age
    };

    const response = await db
      .collection("authors")
      .insertOne(author);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Updated
 */
router.put("/:id", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      nationality,
      age
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !nationality ||
      !age
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const db = mongodb.getDb();

    const authorId = new ObjectId(req.params.id);

    const updatedAuthor = {
      firstName,
      lastName,
      nationality,
      age
    };

    await db.collection("authors").replaceOne(
      { _id: authorId },
      updatedAuthor
    );

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
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
router.delete("/:id", async (req, res) => {
  try {
    const db = mongodb.getDb();

    const authorId = new ObjectId(req.params.id);

    await db.collection("authors").deleteOne({
      _id: authorId
    });

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;