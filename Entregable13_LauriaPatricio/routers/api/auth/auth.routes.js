const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/register-error' }),
  authControllers.register
);

router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login-error' }),
  authControllers.login
);

router.get(
  '/asd', async (req, res) => {

    return res.render('register');
  }
);



module.exports = router;