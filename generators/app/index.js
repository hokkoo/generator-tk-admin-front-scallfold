'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require('yeoman-generator');

var _copyTemplates = require('../utils/copyTemplates.js');

var _copyTemplates2 = _interopRequireDefault(_copyTemplates);

var _findRoot = require('find-root');

var _findRoot2 = _interopRequireDefault(_findRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = function (_Base) {
	_inherits(Generator, _Base);

	function Generator() {
		var _ref;

		_classCallCheck(this, Generator);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Generator.__proto__ || Object.getPrototypeOf(Generator)).call.apply(_ref, [this].concat(args)));

		_this.sourceRoot((0, _findRoot2.default)(__dirname));
		_this.log('source: ' + _this.sourceRoot());
		return _this;
	}

	_createClass(Generator, [{
		key: 'prompting',
		value: function prompting() {
			var _this2 = this;

			var prompts = [{
				name: 'projectName',
				message: '输入应用名称（如 helloworld）',
				default: 'helloworld'
			}];
			return this.prompt(prompts).then(function (props) {
				_this2.name = props.projectName;
				_this2.dir = _path2.default.join(process.cwd(), _this2.name);

				_this2.log('name: ' + _this2.name);
				_this2.log('dir: ' + _this2.dir);

				return Promise.resolve();
			}, function (err) {
				_this2.log('error', JSON.stringify(err, null, 2));
			});
		}
	}, {
		key: 'writing',
		value: function writing() {
			var _this3 = this;

			try {
				var src = _path2.default.join(this.sourceRoot(), './templates/simple-vue-site');
				this.log('src: ' + this.sourceRoot());
				(0, _copyTemplates2.default)(src, this.dir).then(function (rtn) {
					_this3.log('\u521D\u59CB\u5316\u6210\u529F\uFF01\uFF01\n \u6210\u529F\u521B\u5EFA ' + _this3.name);
				});
			} catch (err) {
				this.log('error', JSON.stringify(err, null, 2));
			}
		}
	}]);

	return Generator;
}(_yeomanGenerator.Base);

module.exports = Generator;