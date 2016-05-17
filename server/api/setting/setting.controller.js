/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;
exports.editValue = editValue;

var _setting = require('./setting.model');

var _setting2 = _interopRequireDefault(_setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**

 * @param req
 * @param res
 */

function getValue(req, res) {
  _setting2.default.findOne({ key: req.params.key }, function (err, data) {
    res.json({ err: err, data: data });
  });
}

function editValue(req, res) {
  _setting2.default.findByIdAndUpdate(req.body.setting._id, req.body.setting, function (err, setting) {
    res.json({ err: err, setting: setting });
  });
}
//# sourceMappingURL=setting.controller.js.map
