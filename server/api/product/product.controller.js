/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.findProductById = findProductById;
exports.deleteProduct = deleteProduct;

var _Product = require('./product.model');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**

 * @param req
 * @param res
 */

function getProducts(req, res) {
  _Product2.default.find(function (err, data) {
    res.json({ err: err, data: data });
  });
}

function addProduct(req, res) {
  var product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    collections: req.body.collections,
    colors: req.body.colors,
    spec: req.body.spec
  };
  _Product2.default.create(product, function (err, data) {
    return res.json({ err: err, data: data });
  });
}

function editProduct(req, res) {
  _Product2.default.findByIdAndUpdate(req.body.product._id, req.body.product, function (err, product) {
    res.json({ err: err, product: product });
  });
}

function findProductById(req, res) {
  _Product2.default.findById(req.params.id, function (err, product) {
    return res.json({ err: err, product: product });
  });
}

function deleteProduct(req, res) {
  _Product2.default.findByIdAndRemove(req.body.product._id, function (err, product) {
    res.json({ err: err, product: product });
  });
}
//# sourceMappingURL=product.controller.js.map
