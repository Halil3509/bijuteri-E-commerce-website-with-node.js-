const express = require('express');

const router = express.Router();

const KullaniciController = require('../controllers/kullanici.controller');

router.post('/changedata',KullaniciController.ChangeData);

module.exports = router;