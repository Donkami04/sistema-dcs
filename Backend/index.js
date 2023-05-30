const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const {allRoutes} = require('./routes/index.routes')
const { logErrors, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5174',],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


allRoutes(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`DCS listening on port ${port}`)
})