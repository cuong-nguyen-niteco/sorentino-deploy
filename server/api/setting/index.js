'use strict';

var express = require('express');
var controller = require('./setting.controller');

var router = express.Router();

router.get('/:key', controller.getValue);
router.post('/edit', controller.editValue);

module.exports = router;
//# sourceMappingURL=index.js.map
