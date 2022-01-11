const express = require('express');

const router = express.Router();

const AdresController = require('../controllers/adres.controller');

router.post('/add',AdresController.create);

router.get('/list/:id',AdresController.list);

module.exports = router;