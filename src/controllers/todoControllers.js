let todos = []; // temp memory
let  nextId = 1; // temp memory

const getAllTodos = (req, res) => {
    res.status(200).json(todos);
}; //run when GET /api/todos, 200=> success

const createTodo = (req,res) => {
    const { title } = req.body;  //data sent by client
    const newTodo = {
        id:nextId++,
        title: title,
        createdAt: new Date() // build new todo object, give ID, title and timestamp
    }; 
    todos.push(newTodo); //push into array and send back
    res.status(201).json(newTodo); //success 201
};

const deleteTodo = (req, res) => {
    const { id } = req.params; //ID from url, if DELETE, gets ID in string form
    todos = todos.filter(todo => todo.id !== parseInt(id)); //Filter matching ID, convert string to int
    res.status(200).json({ message: 'Todo deleted sucessfully'}); //send success message
};

module.exports = {getAllTodos, createTodo, deleteTodo}; // export to todoRoutes.js and use them