const Todo = require('../models/Todo');

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
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
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
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTodos, createTodo, toggleTodo, deleteTodo };