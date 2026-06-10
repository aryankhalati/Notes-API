const express = require('express');
const router = express.Router();

const {createNote,getAllNotes,getOneNote, updateNote,deleteNote} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');
const {validate} = require('../middleware/validateMiddleware');
const {Note} = require('../validators/noteValidator')

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
 */

router.get('/', authMiddleware, getAllNotes);
router.get('/:id', authMiddleware, getOneNote);
router.delete('/:id', authMiddleware, deleteNote);
router.post('/', authMiddleware, validate(Note), createNote);
router.put('/:id', authMiddleware, validate(Note),updateNote);


module.exports = router;

