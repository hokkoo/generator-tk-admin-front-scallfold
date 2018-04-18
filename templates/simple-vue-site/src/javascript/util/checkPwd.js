import slice from './lodash-es/slice.js';
import _has from './lodash-es/has.js';
import isUndefined from './lodash-es/isUndefined.js';
import isString from './lodash-es/isString.js';
import isArray from './lodash-es/isArray.js';
import isObject from './lodash-es/isObject.js';
import extend from './extend.js';

const arrPush = Array.prototype.push;

// 6-20位字符
var checkRule1 = function checkRule1 (value) {
	value = value || '';
	if (value.length < 6 || value.length > 20) {
		return false;
	}
	return true;
}

// 只能包含大小写字母、数字以及标点符号（除空格）
var checkRule2 = (function () {
	var availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={}[]|;:,<>.?/";
	return function (value) {
		value = value || '';
		if(!value) {
			return true;
		}
		value = value.split('');
		var invalid = value.some(function (char) {
			return availableChars.indexOf(char) === -1;
		});
		return !invalid;
	}
})();

// 大写字母、小写字母、数字和标点符号至少包含2种
var checkRule3 = (function () {
	var rules = {
		UPPER: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		LOWER: "abcdefghijklmnopqrstuvwxyz",
		NUMBER: "0123456789",
		CHARACTER: "~`!@#$%^&*()_-+={}[]|;:,<>.?/"
	};
	return function (value) {
		var result = 0;
		value = value || '';
		if(!value) {
			return true;
		}
		value = value.split('');
		var valid = false, rule, name;
		for (name in rules) {
			rule = rules[name];
			valid = value.some(function (char) {
				return rule.indexOf(char) !== -1;
			})
			if(valid) {
				result++;
			}
		}
		return result > 1;
	}
})();


var checkStrength = (function () {
	var rules = {
		UPPER: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		LOWER: "abcdefghijklmnopqrstuvwxyz",
		NUMBER: "0123456789",
		CHARACTER: "!@#$%^&*?_~/\\(){}[]<>.-+=|,"
	};

	var tips = {
		low: "建议您使用英文、数字混合的密码并增加长度。",
		mid: "您可以使用英文大小写、数字、符号混合的密码，提高安全程度。",
		high: "请牢记您的密码。"
	};

	function getScore (value) {
		var b = 0;
		6 === value.length ? b += 6 : value.length >= 7 && value.length <= 8 ? b += 8 : value.length >= 9 && value.length <= 10 ? b += 12 : value.length > 10 && (b += 18);
		var c = _countContain(value, rules.UPPER),
			d = _countContain(value, rules.LOWER);
		0 !== d && (b += 1),
			0 !== c && (b += 5);
		var e = _countContain(value, rules.NUMBER);
		0 !== e && (b += 5),
			e >= 3 && (b += 7);
		var f = _countContain(value, rules.CHARACTER),
			g = _countContain(value.charAt(0), rules.CHARACTER);
		return 1 !== f || g || (b += 5),
			f > 1 && (b += 12),
			0 !== c && 0 !== d && (b += 2),
			0 === c && 0 === d || 0 === e || (b += 3),
			0 === c && 0 === d && 0 === e || 0 === f || (b += 3),
			b
	}

	function _countContain (value, list) {
		var count = 0;
		for (var i = 0; i < value.length; i++)
			list.indexOf(value.charAt(i)) > -1 && count++;
		return count;
	}

	function levelCalcAlgorithm(a) {
		return a > 45 ? "high" : a > 25 ? "mid" : "low"
	}

	return function (value) {
		var score = getScore(value);
		var level = levelCalcAlgorithm(score);
		var tip = tips[level];
		return {
			score: score,
			level: level,
			tip: tip
		}
	}
})();


var rules = [
	{
		name: 'rule1',
		check: checkRule1,
		message: '6-20位字符'
	},
	{
		name: 'rule2',
		check: checkRule2,
		message: '只能包含大小写字母、数字以及标点符号（除空格）'
	},
	{
		name: 'rule3',
		check: checkRule3,
		message: '大写字母、小写字母、数字和标点符号至少包含2种'
	}
]

function CheckPwd (value) {
	this.value = value;
	this.resultMap = (function () {
		var map = {};
		rules.forEach(function (rule) {
			map[rule.name] = {
				valid: false,
				message: rule.message
			};
		});
		return map;
	})();
	this.resultMap.strength = {};
}

CheckPwd.prototype = {
	check: function (value) {
		if(!isUndefined(value)) {
			this.value = value;
		}
		var valid, allValid = true, resultMap = this.resultMap, message = [];
		rules.forEach(function (rule) {
			valid = rule.check(value);
			if(!valid) {
				allValid = false;
				resultMap[rule.name].valid = false
				message.push(rule.message);
			} else {
				resultMap[rule.name].valid = true
			}
		});
		var strength = checkStrength(value);
		extend(resultMap.strength, strength);
		resultMap.valid = allValid;
		resultMap.message = message;
		return resultMap;
	}
}
export default new CheckPwd();