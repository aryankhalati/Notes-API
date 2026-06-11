const express = require('express');
const router = express.Router();

const { getAllTodos, createTodo, toggleTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { todoSchema } = require('../validators/todoValidator');

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos for logged in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
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
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.get('/', authMiddleware, getAllTodos);
router.post('/', authMiddleware, validate(todoSchema), createTodo);

/**
 * @swagger
 * /api/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle todo completed status
 *     tags: [Todos]
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
 *         description: Todo toggled
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Todo not found
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
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
 *         description: Todo deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Todo not found
 */
router.patch('/:id/toggle', authMiddleware, toggleTodo);
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;