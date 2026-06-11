const express = require('express');
const router = express.Router();

const { createNote, getAllNotes, getOneNote, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { noteSchema } = require('../validators/noteValidator');

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *   get:
 *     summary: Get all notes for logged in user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 */
router.post('/', authMiddleware, validate(noteSchema), createNote);
router.get('/', authMiddleware, getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Note not found
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Note not found
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Note not found
 */
router.get('/:id', authMiddleware, getOneNote);
router.put('/:id', authMiddleware, validate(noteSchema), updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;