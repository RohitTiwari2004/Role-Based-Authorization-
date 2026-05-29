const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username should be unique'],
    },
    passowrd: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'manager', 'user'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
