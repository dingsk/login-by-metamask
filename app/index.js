require('dotenv').config()
require('./db');

const cors = require('cors');
const express = require('express');

const {services} = require('./services');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Mount REST on /api
app.use('/api', services);

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);