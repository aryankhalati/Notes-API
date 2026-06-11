const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, deleteTodo } = require('../controllers/todoControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllTodos);
router.post('/', authMiddleware, createTodo);
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;