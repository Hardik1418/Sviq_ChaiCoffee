const express = require('express');
const router = express.Router();
const officeController = require('../controllers/office.controller');

// Route to get the total number of offices
router.get('/getOffice/:id', officeController.getOffice);

// Route to create a new office
router.post('/create', officeController.createOffice);

module.exports = router;
