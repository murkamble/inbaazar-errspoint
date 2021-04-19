const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controller/category');
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

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getcategories', getCategories);

module.exports = router;