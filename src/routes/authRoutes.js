const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const {validate} = require('../middleware/validateMiddleware');
const {Register, Login} = require('../validators/authValidator');


router.get('/me', authMiddleware, (req,res)=> {
  res.status(200).json({user: req.user});
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */

router.post('/register', validate(Register), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token
 *       400:
 *         description: Invalid credentials
 */

router.post('/login', validate(Login), login);
module.exports = router;