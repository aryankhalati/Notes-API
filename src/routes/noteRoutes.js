const express = require('express');
const router = express.Router();

const {createNote,getAllNotes,getOneNote, updateNote,deleteNote} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getAllNotes);
router.get('/:id', authMiddleware, getOneNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;

