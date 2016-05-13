'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.models = {};
_mongoose2.default.modelSchemas = {};

var ColorSchema = _mongoose2.default.Schema({
  name: String,
  code: String,
  images: [String]
});

var ProductSchema = _mongoose2.default.Schema({
  name: String,
  price: Number,
  description: String,
  collections: [Number],
  colors: [ColorSchema],
  spec: {
    description: String,
    details: String,
    material: String
  }
});

exports.default = _mongoose2.default.model('Product', ProductSchema);
//# sourceMappingURL=product.model.js.map
