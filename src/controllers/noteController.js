const Note = require('../models/Note');

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId: req.user.id });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        return res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, getAllNotes, getOneNote, updateNote, deleteNote };