'use strict'

const express = require('express');
const cors = require('cors');
const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
const docRoutes = require('./routes/doctor-rt');
const userRoutes = require('./routes/user-rt');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cfgram-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);
app.use('/api', docRoutes(router));
app.use('/api', userRoutes(router));

app.listen(PORT, () console.log(`Conneected to port ${PORT}`));
