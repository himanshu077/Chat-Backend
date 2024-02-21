const express = require('express');
const router = express.Router();
const chatsControls = require('../controllers/chatscontroller');

router.post('/login', chatsControls.userlogin);
router.post('/register',chatsControls.userRegister);
router.get('/alluser',chatsControls.Alluser);
router.post('/logout',chatsControls.logout);









module.exports = router;

