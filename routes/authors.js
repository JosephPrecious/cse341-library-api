const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors");

/*
========================================
GET ALL AUTHORS
========================================
*/
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authorsController.getAllAuthors);

/*
========================================
GET SINGLE AUTHOR
========================================
*/
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a single author
 */
router.get("/:id", authorsController.getSingleAuthor);

/*
========================================
CREATE AUTHOR
========================================
*/
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create an author
 */
router.post("/", authorsController.createAuthor);

/*
========================================
UPDATE AUTHOR
========================================
*/
/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 */
router.put("/:id", authorsController.updateAuthor);

/*
========================================
DELETE AUTHOR
========================================
*/
/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 */
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;