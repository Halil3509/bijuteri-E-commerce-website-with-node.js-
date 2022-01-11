const express = require('express');

const router = express.Router();

const SiparisController = require('../controllers/siparis.controller');

router.post('/addtobasket',SiparisController.addToBasket);

router.post('/removefrombasket',SiparisController.removeFromBasket);

router.get('/basket/:id',SiparisController.list);

module.exports = router;