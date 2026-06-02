const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(201).json({
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
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: 'Invalid Credintials provided' });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' },
    );
    return res.status(200).json({ token });
  } catch (err) {
    message: err.message;
  }
};
module.exports = { register, login };
