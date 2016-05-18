'use strict';

var express = require('express');
var controller = require('./constant.controller');

var router = express.Router();

router.get('/', controller.getConstant);
router.get('/collection', controller.getCollection);
router.get('/product', controller.getAllProduct);
router.get('/product/:id', controller.getProduct);

module.exports = router;
//# sourceMappingURL=index.js.map
