'use strict';

const departmentController = require('../controllers').department;
const express = require('express');
const router = express.Router();

router.post('/create', departmentController.create);

module.exports = router;
