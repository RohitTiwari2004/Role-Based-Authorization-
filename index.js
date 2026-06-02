const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./src/config/dbConnect');
const router = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
dbConnect();

const app = express();
//Middlewares..
app.use(express.json());

//Route
app.use('/api/auth', router);
app.use('/api/users', userRoutes);

//Starting the server
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
