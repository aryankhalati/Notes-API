const express = require('express'); //use express
const app = express(); //server application

app.use(express.json()); // convert raw text to js object

const todoRoutes = require('./src/routes/todoRoutes');
app.use('/api/todos', todoRoutes); //import route files & ('/api/todos handle by todoROutes)

const connectDB = require('./src/db.js');
connectDB();

const PORT = 5000; //starts server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`); //confirm running
});


