const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.NODE_PORT;
const cors = require('cors');
const {allRoutes} = require('./routes/index.routes');
const { logErrors, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.use(cors({
  origin: [
  'http://localhost:4000',
  'http://10.224.116.78:4000',
  'http://10.224.116.14:4000',
],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


allRoutes(app);

app.use(logErrors);
app.use(errorHandler);
app.use(ormErrorHandler);

app.listen(port, () => {
  console.log(`System running on port ${port}`)
});