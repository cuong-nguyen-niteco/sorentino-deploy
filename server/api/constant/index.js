'use strict';

var express = require('express');
var controller = require('./constant.controller');

var router = express.Router();

router.get('/menu', controller.getMenu);

module.exports = router;
//# sourceMappingURL=index.js.map
