const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const {validate} = require('../middleware/validateMiddleware');
const {Register, Login} = require('../validators/authValidator');


router.get('/me', authMiddleware, (req,res)=> {
  res.status(200).json({user: req.user});
});

router.post('/register', validate(Register), register);
router.post('/login', validate(Login), login);
module.exports = router;