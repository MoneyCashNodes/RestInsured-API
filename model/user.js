'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  fullName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  insurance: {type: String, required: true},
});

