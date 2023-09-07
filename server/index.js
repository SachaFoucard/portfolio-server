const express = require('express');
const cors = require('cors');
const DBconnect = require('./config/database')
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use('/api',require('./nodemailer/nodemailer'));

try {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  DBconnect()
} catch (error) {
  console.log(error);
}
