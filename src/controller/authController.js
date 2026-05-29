const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');
const register = async (req, res) => {
  try {
    const { username, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      message: `User registered with username ${username}`,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: `User  with username ${username} not found`,
      });
      const isMatch = await bcrypt.compare(password, user.password);
    }
  } catch (err) {
    res.status(500).json({
      message: ' Something went wrong',
    });
  }
};

module.exports = { register, login };
