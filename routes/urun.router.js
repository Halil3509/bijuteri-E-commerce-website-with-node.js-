const express = require('express');

const router = express.Router();

const UrunController = require('../controllers/urun.controller');

router.get('/list/:id',UrunController.list);

router.get('/create',UrunController.create);

router.post('/detail',UrunController.getDetail);

router.post('/filter',UrunController.filter);

module.exports = router;