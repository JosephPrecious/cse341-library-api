const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books");

/*
========================================
GET ALL BOOKS
========================================
*/
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", booksController.getAllBooks);

/*
========================================
GET SINGLE BOOK
========================================
*/
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book
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
router.get("/:id", booksController.getSingleBook);

/*
========================================
CREATE BOOK
========================================
*/
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 */
router.post("/", booksController.createBook);

/*
========================================
UPDATE BOOK
========================================
*/
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
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
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put("/:id", booksController.updateBook);

/*
========================================
DELETE BOOK
========================================
*/
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
 *         description: Book deleted
 */
router.delete("/:id", booksController.deleteBook);

module.exports = router;