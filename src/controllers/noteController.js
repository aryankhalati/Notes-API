const mongoose = require('mongoose');
const Note = require('../models/Note');

// Reusable ObjectId guard
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

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
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const { title, content } = req.body;

        // Atomic single-query ownership check + update
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        // Atomic single-query ownership check + delete
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ message: 'Note deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createNote, getAllNotes, getOneNote, updateNote, deleteNote };