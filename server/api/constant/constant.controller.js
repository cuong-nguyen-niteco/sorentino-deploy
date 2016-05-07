/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenu = getMenu;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('./../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_RESOURCE = _path2.default.normalize(_environment2.default.root + '/server/resources');
var CONSTANT_FILE = _path2.default.normalize(ROOT_RESOURCE + '/constant/sorentino.json');

// Gets a list of Things
function getMenu(req, res) {
  var obj = JSON.parse(_fs2.default.readFileSync(CONSTANT_FILE, 'utf8'));
  res.json(obj);
}
//# sourceMappingURL=constant.controller.js.map
