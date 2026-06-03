const express = require('express'); //import express
const router = express.Router(); // minin router, handle only todo rltd routes

const { getAllTodos, createTodo, deleteTodo} = require('../controllers/todoControllers'); // import function from controller file

router.get('/', getAllTodos); //route 1
router.post('/', createTodo); // route 2
router.delete('/:id', deleteTodo); // route 3 

module.exports = router //to impoer to index.js
