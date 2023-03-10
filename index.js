/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/user');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: '*',
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use('/', userRouter);

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 8000');
});
