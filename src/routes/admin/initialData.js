const express = require('express');
const router = express.Router();
const { initialData } = require('../../controller/admin/initialData');
// const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
// const { requireSignin } = require('../../common-middleware');

router.post('/initialdata', initialData);

module.exports = router;