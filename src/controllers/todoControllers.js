

const Todo = require('../models/Todo');

 const getAllTodos = async (req, res) => { //async coz data fetching takes time
    try{

        const todos = await Todo.find(); // .find fetch all todo docs, await wait until done
        res.status(200).json(todos); //success message via 200
    }
    catch (error){ //if any prblm, catch it and show error
        res.status(500).json({message : error.message});  //500 - server error

    }
 };
const createTodo = async (req, res) => {
    try{
        const tocreate = await Todo.create(req.body);
        res.status(201).json(tocreate);
    }
    catch (error) {
        res.status(500).json({message : error.message});
    }
}
const deleteTodo = async (req, res) => {
    try {
        const todelete = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(todelete);
    }
    catch (error) {
           res.status(500).json({message : error.message});
    }
}
module.exports = {getAllTodos, createTodo, deleteTodo}; // export to todoRoutes.js and use them

