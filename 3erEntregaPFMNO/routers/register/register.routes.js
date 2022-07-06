const { Router } = require('express');
const passport = require('../../middlewares/passport')

const {
  register,
} = require('../../controllers/register.controllers');

const router = Router();

router.get('/', register);

router.post('/', passport.authenticate('register'));

module.exports = router;