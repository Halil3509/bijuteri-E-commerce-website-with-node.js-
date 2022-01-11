const express = require('express');

const router = express.Router();

const KategoriController = require('../controllers/kategori.controller');

router.get('/create',KategoriController.create);



module.exports = router;