const Todo = require('../models/Todo');

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });

        const todo = await Todo.create({ title, userId: req.user.id });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTodos, createTodo, deleteTodo };