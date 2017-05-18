'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const debug = require('debug')('restInsured:server');
const Promise = require('bluebird');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
const docRoutes = require('./routes/doctor-rt.js');
const userRoutes = require('./routes/user-rt');

const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restInsured-dev';

const app = module.exports = express();
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use(errorHandler);
app.use(cors());
app.use(bodyParser);
// app.use('/ext', docRoutes(router));
app.use('/api', userRoutes(router));

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
