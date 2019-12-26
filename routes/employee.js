'use strict';

const employeeController = require('../controllers').employee;
const express = require('express');
const router = express.Router();

router.post('/create', employeeController.create);

module.exports = router;
