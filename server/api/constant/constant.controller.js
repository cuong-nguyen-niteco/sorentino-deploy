/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConstant = getConstant;
exports.getCollection = getCollection;
exports.getAllProduct = getAllProduct;
exports.getProduct = getProduct;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('./../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_RESOURCE = _path2.default.normalize(_environment2.default.root + '/server/resources');
var CONSTANT_FILE = _path2.default.normalize(ROOT_RESOURCE + '/sorentino.json');
var PRODUCT_FILE = _path2.default.normalize(ROOT_RESOURCE + '/product.json');
var COLLECTION_FILE = _path2.default.normalize(ROOT_RESOURCE + '/collection.json');

var constant = JSON.parse(_fs2.default.readFileSync(CONSTANT_FILE, 'utf8'));
var product = JSON.parse(_fs2.default.readFileSync(PRODUCT_FILE, 'utf8'));
var collection = JSON.parse(_fs2.default.readFileSync(COLLECTION_FILE, 'utf8'));

function getConstant(req, res) {
  res.json(constant);
}

function getCollection(req, res) {
  res.json(collection);
}

function getAllProduct(req, res) {
  res.json(product);
}

function getProduct(req, res) {
  var data = {};
  for (var i = 0; i < product.products.length; i++) {
    var prod = product.products[i];
    if (req.params.id == prod.id) {
      data = prod;
      break;
    }
  }

  res.json(data);
}
//# sourceMappingURL=constant.controller.js.map
