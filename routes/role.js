'use strict';

const roleController = require('../controllers').role;
const express = require('express');
const router = express.Router();

router.post('/create', roleController.create);

module.exports = router;
