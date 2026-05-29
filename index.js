const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./src/config/dbConnect');
dbConnect();

const app = express();
//Middlewares..
app.use(express.json());

//Starting the server
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
