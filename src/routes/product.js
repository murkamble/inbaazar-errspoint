const express = require('express');
const router = express.Router();
const { createProduct } = require('../controller/product');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cd) {
        cd(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post(
    '/product/create',
    requireSignin,
    adminMiddleware,
    upload.array('productPicture'),
    createProduct
);


module.exports = router;