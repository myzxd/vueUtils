var express = require('express');
var router = express.Router();
var prodcot = require("./module/index.js")
var base = require("./module/user.js")
router.use('/prodcot', prodcot);
router.use('/manage', base);
module.exports = router;