const express =require('express');

const router = express.Router();

const HomeController = require('../controllers/home.controller');

router.post('/login',HomeController.login);

router.post('/signup',HomeController.signup);

router.get('/opensignup',HomeController.OpenSignupPage);

router.get('/',HomeController.OpenLoginPage);

router.get('/openaccount/:_id',HomeController.OpenAccount);

router.get('/openhome/:id',HomeController.OpenHomePage);

module.exports = router;