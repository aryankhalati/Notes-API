const Note = require('../models/Note');

const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId: req.user.id });
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        next(error);
    }
};

const getOneNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(note);
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createNote, getAllNotes, getOneNote, updateNote, deleteNote };