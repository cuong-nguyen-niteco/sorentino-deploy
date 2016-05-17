'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SettingSchema = _mongoose2.default.Schema({
  key: String,
  value: String
});

exports.default = _mongoose2.default.model('Setting', SettingSchema);
//# sourceMappingURL=setting.model.js.map
