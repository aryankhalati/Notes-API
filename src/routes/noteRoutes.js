const express = require('express');
const router = express.Router();

const {createNote,getAllNotes,getOneNote, updateNote,deleteNote} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');
const {validate} = require('../middleware/validateMiddleware');
const {Note} = require('../validators/noteValidator')


router.get('/', authMiddleware, getAllNotes);
router.get('/:id', authMiddleware, getOneNote);
router.delete('/:id', authMiddleware, deleteNote);
router.post('/', authMiddleware, validate(Note), createNote);
router.put('/:id', authMiddleware, validate(Note),updateNote);


module.exports = router;

