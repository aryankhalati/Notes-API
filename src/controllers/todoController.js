const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// Reusable ObjectId guard
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { title } = req.body;
        const todo = await Todo.create({ title, userId: req.user.id });
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
};

const toggleTodo = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        // Atomic single-query ownership check + delete
        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTodos, createTodo, toggleTodo, deleteTodo };