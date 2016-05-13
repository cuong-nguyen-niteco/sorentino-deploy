'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/all', controller.getProducts);
router.get('/:id', controller.findProductById);

router.post('/add', controller.addProduct);
router.post('/edit', controller.editProduct);
router.post('/delete', controller.deleteProduct);

module.exports = router;
//# sourceMappingURL=index.js.map
