const { Router } = require('express');
const { createUser, loginUser } = require('../controllers/auth');
const { createUserValidator, loginUserValidator } = require('../middlewares/auth-validator');

const router = Router();

router.post('/register', createUserValidator, createUser);
router.post('/login', loginUserValidator, loginUser);

module.exports = router;
