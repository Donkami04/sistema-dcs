const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const {allRoutes} = require('./routes/index.routes');
const { logErrors, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.use(cors({
  origin: [
  'http://localhost:4000',
  'http://10.224.116.78:4000',
  'http://10.224.116.14:4000',
'http://10.224.116.78:4001'
],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


allRoutes(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`DCS listening on port ${port}`)
});
