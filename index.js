const express = require('express'); //use express
const app = express(); //server application

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(express.json()); // convert raw text to js object




app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    windowMs : 15*60*1000,
    max: 10
})

app.use('/api/auth',limiter)

const todoRoutes = require('./src/routes/todoRoutes');
app.use('/api/todos', todoRoutes); //import route files & ('/api/todos handle by todoROutes)

const authRoutes = require('./src/routes/authRoutes.js');
app.use('/api/auth', authRoutes);

const noteRoutes = require('./src/routes/noteRoutes');
app.use('/api/notes', noteRoutes);

const connectDB = require('./src/db.js');
connectDB();

const errorMiddleware = require('./src/middleware/errorMiddleware');
app.use(errorMiddleware);

const PORT = 5000; //starts server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`); //confirm running
});



