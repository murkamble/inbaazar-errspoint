const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../controller/auth');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth');

router.post('/signup', isRequestValidated, validateSignupRequest, signup);
router.post('/signin', isRequestValidated, validateSigninRequest, signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({
//         user: 'profile'
//     });
// });

module.exports = router;