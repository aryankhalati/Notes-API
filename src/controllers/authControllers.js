const User = require('../models/User');

const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 1. Check if user already exists
    const existingUser = await User.findOne({email : email});
    if (existingUser) {
        return res.status(400).json({message : 'User already exists'})
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 3. Create user in DB
    const createUser = await User.create({name, email,password : hashedPassword});
    
     // 4. Send success response
    res.status(201).json(createUser);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {register};