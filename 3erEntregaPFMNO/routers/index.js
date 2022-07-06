const express = require('express');
const registerRoutes = require('./register/register.routes');

const router = express.Router();

router.use('/register', registerRoutes);

module.exports = router;