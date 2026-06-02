const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const authorizedRole = require('../middleware/roleMiddleware');
const router = express.Router();

//only admin can access this route....
router.get('/admin', verifyToken, authorizedRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

//Both admin and manager can access this route..
router.get(
  '/manager',
  verifyToken,
  authorizedRole('admin', 'manager'),
  (req, res) => {
    res.status(200).json({
      message: 'Welcome Manager',
    });
  },
);

//All can access this route..
router.get('/user', verifyToken, authorizedRole('user'), (req, res) => {
  res.status(200).json({
    message: 'Welcome User',
  });
});

module.exports = router;
