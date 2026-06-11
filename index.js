require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/db.js');
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});
app.use('/api/auth', limiter);

const todoRoutes = require('./src/routes/todoRoutes');
app.use('/api/todos', todoRoutes);

const authRoutes = require('./src/routes/authRoutes.js');
app.use('/api/auth', authRoutes);

const noteRoutes = require('./src/routes/noteRoutes');
app.use('/api/notes', noteRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true } }));

const errorMiddleware = require('./src/middleware/errorMiddleware');
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});