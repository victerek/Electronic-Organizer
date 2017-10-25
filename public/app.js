(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/Calculator/AutoScallingText.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component for auto scalling the size of the result of calculations in Calculator
var AutoScalingText = function (_React$Component) {
  _inherits(AutoScalingText, _React$Component);

  function AutoScalingText(props) {
    _classCallCheck(this, AutoScalingText);

    var _this = _possibleConstructorReturn(this, (AutoScalingText.__proto__ || Object.getPrototypeOf(AutoScalingText)).call(this, props));

    _this.state = {
      scale: 1
    };
    return _this;
  }

  _createClass(AutoScalingText, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var scale = this.state.scale;


      var node = this.node;
      var parentNode = node.parentNode;

      var availableWidth = parentNode.offsetWidth;
      var actualWidth = node.offsetWidth;
      var actualScale = availableWidth / actualWidth;

      if (scale === actualScale) return;

      if (actualScale < 1) {
        this.setState({ scale: actualScale });
      } else if (scale < 1) {
        this.setState({ scale: 1 });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var scale = this.state.scale;


      return _react2.default.createElement(
        "div",
        {
          className: "auto-scaling-text",
          style: { transform: "scale(" + scale + "," + scale + ")" },
          ref: function ref(node) {
            return _this2.node = node;
          }
        },
        this.props.children
      );
    }
  }]);

  return AutoScalingText;
}(_react2.default.Component);

exports.default = AutoScalingText;

});

require.register("components/Calculator/Calculator.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalculatorDisplay = require('./CalculatorDisplay');

var _CalculatorDisplay2 = _interopRequireDefault(_CalculatorDisplay);

var _CalculatorKey = require('./CalculatorKey');

var _CalculatorKey2 = _interopRequireDefault(_CalculatorKey);

var _AutoScallingText = require('./AutoScallingText');

var _AutoScallingText2 = _interopRequireDefault(_AutoScallingText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Arithmetic operations
var CalculatorOperations = {
  '/': function _(prevValue, nextValue) {
    return prevValue / nextValue;
  },
  '*': function _(prevValue, nextValue) {
    return prevValue * nextValue;
  },
  '+': function _(prevValue, nextValue) {
    return prevValue + nextValue;
  },
  '-': function _(prevValue, nextValue) {
    return prevValue - nextValue;
  },
  '=': function _(prevValue, nextValue) {
    return nextValue;
  }
};

// Calculator Component

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    };
    return _this;
  }

  _createClass(Calculator, [{
    key: 'clearAll',
    value: function clearAll() {
      this.setState({
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      });
    }
  }, {
    key: 'clearDisplay',
    value: function clearDisplay() {
      this.setState({
        displayValue: '0'
      });
    }
  }, {
    key: 'clearLastChar',
    value: function clearLastChar() {
      var displayValue = this.state.displayValue;


      this.setState({
        displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
      });
    }
  }, {
    key: 'toggleSign',
    value: function toggleSign() {
      var displayValue = this.state.displayValue;

      var newValue = parseFloat(displayValue) * -1;

      this.setState({
        displayValue: String(newValue)
      });
    }
  }, {
    key: 'inputPercent',
    value: function inputPercent() {
      var displayValue = this.state.displayValue;

      var currentValue = parseFloat(displayValue);

      if (currentValue === 0) return;

      var fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
      var newValue = parseFloat(displayValue) / 100;

      this.setState({
        displayValue: String(newValue.toFixed(fixedDigits.length + 2))
      });
    }
  }, {
    key: 'inputDot',
    value: function inputDot() {
      var displayValue = this.state.displayValue;


      if (!/\./.test(displayValue)) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        });
      }
    }
  }, {
    key: 'inputDigit',
    value: function inputDigit(digit) {
      var _state = this.state,
          displayValue = _state.displayValue,
          waitingForOperand = _state.waitingForOperand;


      if (waitingForOperand) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        });
      } else {
        this.setState({
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        });
      }
    }
  }, {
    key: 'performOperation',
    value: function performOperation(nextOperator) {
      var _state2 = this.state,
          value = _state2.value,
          displayValue = _state2.displayValue,
          operator = _state2.operator;

      var inputValue = parseFloat(displayValue);

      if (value == null) {
        this.setState({
          value: inputValue
        });
      } else if (operator) {
        var currentValue = value || 0;
        var newValue = CalculatorOperations[operator](currentValue, inputValue);

        this.setState({
          value: newValue,
          displayValue: String(newValue)
        });
      }

      this.setState({
        waitingForOperand: true,
        operator: nextOperator
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var displayValue = this.state.displayValue;


      var clearDisplay = displayValue !== '0';
      var clearText = clearDisplay ? 'C' : 'AC';

      return _react2.default.createElement(
        'div',
        { id: 'calc-wrapper', className: 'flexing' },
        _react2.default.createElement(
          'div',
          { id: 'calc-app' },
          _react2.default.createElement(
            'div',
            { id: 'calculator', className: 'align-center' },
            _react2.default.createElement(_CalculatorDisplay2.default, { value: displayValue }),
            _react2.default.createElement(
              'div',
              { className: 'calculator-keypad' },
              _react2.default.createElement(
                'div',
                { className: 'input-keys' },
                _react2.default.createElement(
                  'div',
                  { className: 'function-keys' },
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-clear', onPress: function onPress() {
                        return clearDisplay ? _this2.clearDisplay() : _this2.clearAll();
                      } },
                    clearText
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-sign', onPress: function onPress() {
                        return _this2.toggleSign();
                      } },
                    '\xB1'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-percent', onPress: function onPress() {
                        return _this2.inputPercent();
                      } },
                    '%'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'digit-keys' },
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-0', onPress: function onPress() {
                        return _this2.inputDigit(0);
                      } },
                    '0'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-dot', onPress: function onPress() {
                        return _this2.inputDot();
                      } },
                    '\u25CF'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-1', onPress: function onPress() {
                        return _this2.inputDigit(1);
                      } },
                    '1'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-2', onPress: function onPress() {
                        return _this2.inputDigit(2);
                      } },
                    '2'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-3', onPress: function onPress() {
                        return _this2.inputDigit(3);
                      } },
                    '3'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-4', onPress: function onPress() {
                        return _this2.inputDigit(4);
                      } },
                    '4'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-5', onPress: function onPress() {
                        return _this2.inputDigit(5);
                      } },
                    '5'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-6', onPress: function onPress() {
                        return _this2.inputDigit(6);
                      } },
                    '6'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-7', onPress: function onPress() {
                        return _this2.inputDigit(7);
                      } },
                    '7'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-8', onPress: function onPress() {
                        return _this2.inputDigit(8);
                      } },
                    '8'
                  ),
                  _react2.default.createElement(
                    _CalculatorKey2.default,
                    { className: 'key-9', onPress: function onPress() {
                        return _this2.inputDigit(9);
                      } },
                    '9'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'operator-keys' },
                _react2.default.createElement(
                  _CalculatorKey2.default,
                  { className: 'key-divide', onPress: function onPress() {
                      return _this2.performOperation('/');
                    } },
                  '\xF7'
                ),
                _react2.default.createElement(
                  _CalculatorKey2.default,
                  { className: 'key-multiply', onPress: function onPress() {
                      return _this2.performOperation('*');
                    } },
                  '\xD7'
                ),
                _react2.default.createElement(
                  _CalculatorKey2.default,
                  { className: 'key-subtract', onPress: function onPress() {
                      return _this2.performOperation('-');
                    } },
                  '\u2212'
                ),
                _react2.default.createElement(
                  _CalculatorKey2.default,
                  { className: 'key-add', onPress: function onPress() {
                      return _this2.performOperation('+');
                    } },
                  '+'
                ),
                _react2.default.createElement(
                  _CalculatorKey2.default,
                  { className: 'key-equals', onPress: function onPress() {
                      return _this2.performOperation('=');
                    } },
                  '='
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Calculator;
}(_react2.default.Component);

exports.default = Calculator;

});

require.register("components/Calculator/CalculatorDisplay.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoScallingText = require('./AutoScallingText');

var _AutoScallingText2 = _interopRequireDefault(_AutoScallingText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Displaying the Calculator Component
var CalculatorDisplay = function (_React$Component) {
  _inherits(CalculatorDisplay, _React$Component);

  function CalculatorDisplay() {
    _classCallCheck(this, CalculatorDisplay);

    return _possibleConstructorReturn(this, (CalculatorDisplay.__proto__ || Object.getPrototypeOf(CalculatorDisplay)).apply(this, arguments));
  }

  _createClass(CalculatorDisplay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          props = _objectWithoutProperties(_props, ['value']);

      var language = navigator.language || 'en-US';
      var formattedValue = parseFloat(value).toLocaleString(language, {
        useGrouping: true,
        maximumFractionDigits: 6
      });

      var match = value.match(/\.\d*?(0*)$/);

      if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: 'calculator-display' }),
        _react2.default.createElement(
          _AutoScallingText2.default,
          null,
          formattedValue
        )
      );
    }
  }]);

  return CalculatorDisplay;
}(_react2.default.Component);

exports.default = CalculatorDisplay;

});

require.register("components/Calculator/CalculatorKey.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactPoint = require("react-point");

var _reactPoint2 = _interopRequireDefault(_reactPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Arithmetic operations Component
var CalculatorKey = function (_React$Component) {
  _inherits(CalculatorKey, _React$Component);

  function CalculatorKey() {
    _classCallCheck(this, CalculatorKey);

    return _possibleConstructorReturn(this, (CalculatorKey.__proto__ || Object.getPrototypeOf(CalculatorKey)).apply(this, arguments));
  }

  _createClass(CalculatorKey, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onPress = _props.onPress,
          className = _props.className,
          props = _objectWithoutProperties(_props, ["onPress", "className"]);

      return _react2.default.createElement(
        _reactPoint2.default,
        { onPoint: onPress },
        _react2.default.createElement("button", _extends({ className: "calculator-key " + className }, props))
      );
    }
  }]);

  return CalculatorKey;
}(_react2.default.Component);

exports.default = CalculatorKey;

});

require.register("components/Todo/components/Alert.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Alert Component
var Alert = function (_Component) {
  _inherits(Alert, _Component);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
  }

  _createClass(Alert, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.props.visible ? _react2.default.createElement(
          "div",
          {
            className: this.props.type === "error" ? "alert alert-danger" : "alert alert-success", role: "alert",
            onClick: this.props.hide
          },
          this.props.value
        ) : ""
      );
    }
  }]);

  return Alert;
}(_react.Component);

exports.default = Alert;

});

require.register("components/Todo/components/GlobalAction.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// User actions Component

var GlobalAction = function (_Component) {
  _inherits(GlobalAction, _Component);

  function GlobalAction() {
    _classCallCheck(this, GlobalAction);

    return _possibleConstructorReturn(this, (GlobalAction.__proto__ || Object.getPrototypeOf(GlobalAction)).apply(this, arguments));
  }

  _createClass(GlobalAction, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "clear_completed" },
        _react2.default.createElement(
          "div",
          { className: "btn-group", role: "group" },
          _react2.default.createElement(
            "button",
            {
              onClick: this.props.checkAll,
              type: "button",
              className: "btn btn-success",
              title: "Finish all tasks" },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-ok", "aria-hidden": "true" })
          ),
          _react2.default.createElement(
            "button",
            {
              onClick: this.props.deleteCompleted,
              type: "button",
              className: "btn btn-danger",
              title: "Delete completed tasks" },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-trash", "aria-hidden": "true" })
          )
        )
      );
    }
  }]);

  return GlobalAction;
}(_react.Component);

exports.default = GlobalAction;

});

require.register("components/Todo/components/Item.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Main Item Component
var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.state = {
      editable: false,
      value: _this.props.value
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleTyping = _this.handleTyping.bind(_this);
    return _this;
  }

  _createClass(Item, [{
    key: "handleTyping",
    value: function handleTyping(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.editItem(this.props.id, this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "li",
        { onDoubleClick: function onDoubleClick() {
            return _this2.setState({ editable: true });
          },
          className: this.props.checked ? "list-group-item checked" : "list-group-item" },
        _react2.default.createElement(
          "button",
          { className: "btn check_btn", type: "button",
            onClick: function onClick() {
              return _this2.props.checkItem(_this2.props.id);
            } },
          _react2.default.createElement("i", { className: this.props.checked ? "fa fa-check-circle-o fa-lg" : "fa fa-circle-o fa-lg", "aria-hidden": "true" })
        ),
        this.state.editable ? _react2.default.createElement(
          "form",
          { onSubmit: this.handleSubmit },
          _react2.default.createElement("input", {
            className: "editableItem form-control",
            type: "text", autoFocus: true,
            value: this.state.value,
            onChange: this.handleTyping,
            placeholder: this.props.value })
        ) : _react2.default.createElement(
          "span",
          null,
          this.props.value
        ),
        this.state.editable ? "" : _react2.default.createElement(
          "button",
          {
            className: "btn delete_btn",
            type: "button",
            onClick: function onClick() {
              return _this2.props.deleteItem(_this2.props.id);
            } },
          _react2.default.createElement("span", { className: "glyphicon glyphicon-remove", "aria-hidden": "true" })
        )
      );
    }
  }]);

  return Item;
}(_react.Component);

exports.default = Item;

});

require.register("components/Todo/components/LeftItems.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Number of tasks left Component
var LeftItems = function (_Component) {
  _inherits(LeftItems, _Component);

  function LeftItems() {
    _classCallCheck(this, LeftItems);

    return _possibleConstructorReturn(this, (LeftItems.__proto__ || Object.getPrototypeOf(LeftItems)).apply(this, arguments));
  }

  _createClass(LeftItems, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "left_count" },
        _react2.default.createElement(
          "span",
          { className: "label label-default" },
          this.props.value,
          " task(s) to do"
        )
      );
    }
  }]);

  return LeftItems;
}(_react.Component);

exports.default = LeftItems;

});

require.register("components/Todo/components/List.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Filter = require('../utils/Filter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Main List Component
var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    _this.state = {
      items: (0, _Filter.Filter)(_this.props.items, _this.props.type)
    };
    return _this;
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'ul',
        { className: 'list-group items_list' },
        this.state.items.length > 0 ? this.state.items.map(function (item, index) {
          return _react2.default.createElement(_Item2.default, { value: item.value,
            key: item.id, id: item.id,
            checked: item.checked,
            checkItem: _this2.props.checkItem,
            deleteItem: _this2.props.deleteItem,
            editItem: _this2.props.editItem,
            context: _this2.props.context });
        }) : _react2.default.createElement(
          'div',
          { className: 'alert alert-danger searchNoResult' },
          'Enter the text and press ',
          _react2.default.createElement(
            'b',
            null,
            '"Enter"'
          ),
          ' or ',
          _react2.default.createElement(
            'b',
            null,
            '"+"'
          ),
          ' to add a new task.'
        )
      );
    }
  }]);

  return List;
}(_react.Component);

exports.default = List;

});

require.register("components/Todo/components/ListSelector.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// List Selector Component
var ListSelector = function (_Component) {
  _inherits(ListSelector, _Component);

  function ListSelector() {
    _classCallCheck(this, ListSelector);

    return _possibleConstructorReturn(this, (ListSelector.__proto__ || Object.getPrototypeOf(ListSelector)).apply(this, arguments));
  }

  _createClass(ListSelector, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'btn-group', role: 'group' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/', className: this.props.active === "all" ? "btn btn-primary" : "btn btn-default" },
          'All'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/active', className: this.props.active === "active" ? "btn btn-primary" : "btn btn-default" },
          'Active'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/completed', className: this.props.active === "completed" ? "btn btn-primary" : "btn btn-default" },
          'Completed'
        )
      );
    }
  }]);

  return ListSelector;
}(_react.Component);

exports.default = ListSelector;

});

require.register("components/Todo/components/New.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// New Task Component
var New = function (_Component) {
  _inherits(New, _Component);

  function New(props) {
    _classCallCheck(this, New);

    var _this = _possibleConstructorReturn(this, (New.__proto__ || Object.getPrototypeOf(New)).call(this, props));

    _this.state = {
      value: _this.props.value
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleTyping = _this.handleTyping.bind(_this);
    return _this;
  }

  _createClass(New, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.handleAdd(this.state.value);
      this.setState({ value: '' });
    }
  }, {
    key: 'handleTyping',
    value: function handleTyping(event) {
      this.setState({ value: event.target.value });
      this.props.handleSearch(event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'input-group' },
        _react2.default.createElement('input', {
          type: 'text',
          className: 'form-control',
          autoFocus: true,
          placeholder: 'What need to be done? Search or add a task...',
          value: this.state.value,
          onChange: this.handleTyping }),
        _react2.default.createElement(
          'span',
          { className: 'input-group-btn' },
          _react2.default.createElement(
            'button',
            {
              className: 'btn btn-primary',
              type: 'submit',
              title: 'Add new task' },
            _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus', 'aria-hidden': 'true' })
          )
        )
      );
    }
  }]);

  return New;
}(_react.Component);

exports.default = New;

});

require.register("components/Todo/containers/ToDoList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _New = require('../components/New');

var _New2 = _interopRequireDefault(_New);

var _List = require('../components/List');

var _List2 = _interopRequireDefault(_List);

var _LeftItems = require('../components/LeftItems');

var _LeftItems2 = _interopRequireDefault(_LeftItems);

var _ListSelector = require('../components/ListSelector');

var _ListSelector2 = _interopRequireDefault(_ListSelector);

var _GlobalAction = require('../components/GlobalAction');

var _GlobalAction2 = _interopRequireDefault(_GlobalAction);

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Store = require('../utils/Store');

var _Search = require('../utils/Search');

var _IsBlank = require('../utils/IsBlank');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Generate key for Router
var reloadCounter = 0;

// Type of Router. Returnes the main component
var routeComponent = function routeComponent(type, context) {
  return _react2.default.createElement(
    'div',
    { className: 'panel panel-default' },
    _react2.default.createElement(
      'div',
      { className: 'panel-body' },
      _react2.default.createElement(_List2.default, { type: type,
        items: (0, _Search.Search)(context.state.items, context.state.search),
        checkItem: context.checkItem,
        deleteItem: context.deleteItem,
        editItem: context.editItem }),
      _react2.default.createElement(_Alert2.default, { value: context.state.alert.value,
        visible: context.state.alert.visible,
        hide: function hide() {
          return context.alert("", false, "");
        },
        type: context.state.alert.type })
    ),
    _react2.default.createElement(
      'div',
      { className: 'panel-footer' },
      _react2.default.createElement(_LeftItems2.default, { value: context.state.leftCount }),
      _react2.default.createElement(_ListSelector2.default, { active: type }),
      _react2.default.createElement(_GlobalAction2.default, {
        deleteCompleted: context.deleteCompleted,
        checkAll: context.checkAll })
    )
  );
};

// Web App To Do List

var ToDoList = function (_Component) {
  _inherits(ToDoList, _Component);

  function ToDoList(props) {
    _classCallCheck(this, ToDoList);

    var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

    _this.state = {
      search: '',
      items: (0, _Store.storeGet)() === null ? [] : (0, _Store.storeGet)(),
      leftCount: _this.countLeft((0, _Store.storeGet)()),
      alert: {
        value: '',
        visible: false,
        type: "error"
      }
    };

    // Context binding
    _this.checkItem = _this.checkItem.bind(_this);
    _this.deleteItem = _this.deleteItem.bind(_this);
    _this.editItem = _this.editItem.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.handleAdd = _this.handleAdd.bind(_this);
    _this.deleteCompleted = _this.deleteCompleted.bind(_this);
    _this.checkAll = _this.checkAll.bind(_this);
    return _this;
  }

  // Returns the counter of active tasks


  _createClass(ToDoList, [{
    key: 'countLeft',
    value: function countLeft(items) {
      var count = 0;

      if (items === undefined || items === null) {
        count = 0;
      } else {
        for (var i = 0; i < items.length; i++) {
          if (!items[i].checked) {
            count++;
          }
        }
      }
      return count;
    }

    // Add task function

  }, {
    key: 'handleAdd',
    value: function handleAdd(item) {
      function listItem(num, text) {
        return {
          id: num,
          value: (0, _IsBlank.removeSpaces)(text),
          checked: false
        };
      }

      if (!(0, _IsBlank.isBlank)(item)) {
        this.setState({ search: '' });
        this.alert("Cannot add the empty task! Enter task name", true, "error");
      } else {
        var newId = 0;
        var itemsList = this.state.items;

        if (itemsList[itemsList.length - 1] !== undefined) {
          newId = itemsList[itemsList.length - 1].id + 1;
        } else {
          newId = 1;
        }

        var newItem = new listItem(newId, item);
        itemsList.push(newItem);

        this.setState({ items: itemsList });
        this.setState({ leftCount: this.countLeft(itemsList) });
        this.setState({ search: '' });
        (0, _Store.storeSave)(this.state.items);
        reloadCounter++;
      }
    }

    // Search through tasks function

  }, {
    key: 'handleSearch',
    value: function handleSearch(text) {
      this.setState({ search: text });
      reloadCounter++;
    }

    // Check item function

  }, {
    key: 'checkItem',
    value: function checkItem(id) {
      var itemsList = this.state.items;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id === id) {
          itemsList[i].checked = !itemsList[i].checked;
        }
      }
      this.setState({ search: this.state.search });
      this.setState({ items: itemsList });
      this.setState({ leftCount: this.countLeft(this.state.items) });
      (0, _Store.storeSave)(this.state.items);
      reloadCounter++;
    }

    // Delete task function

  }, {
    key: 'deleteItem',
    value: function deleteItem(id) {
      var itemsList = this.state.items;

      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id === id) {
          itemsList.splice(i, 1);
        }
      }

      this.setState({ search: this.state.search });
      this.setState({ items: itemsList });
      this.setState({ leftCount: this.countLeft(this.state.items) });
      this.alert("The task was deleted!", true, "success");
      (0, _Store.storeSave)(this.state.items);
      reloadCounter++;
    }

    // Rename task function

  }, {
    key: 'editItem',
    value: function editItem(id, value) {
      if (value.length === 0) {
        this.alert("It is impossible to add an empty task. Enter the name", true, "error");
      } else {
        var itemsList = this.state.items;

        for (var i = 0; i < itemsList.length; i++) {
          if (itemsList[i].id === id) {
            itemsList[i].value = value;
          }
        }

        this.setState({ search: this.state.search });
        this.setState({ items: itemsList });
        (0, _Store.storeSave)(this.state.items);
        reloadCounter++;
      }
    }

    // Alert for the user

  }, {
    key: 'alert',
    value: function alert(value, visible, type) {
      this.setState({ alert: { value: value, visible: visible, type: type } });
      var context = this;

      // Hide alert for 1.5 seconds
      function hideAlert() {
        reloadCounter++;
        context.setState({ alert: { value: "", visible: false, type: "type" } });
        reloadCounter++;
      }
      setTimeout(function () {
        hideAlert();
      }, 1500);

      reloadCounter++;
    }

    // Delete completed tasks function

  }, {
    key: 'deleteCompleted',
    value: function deleteCompleted() {
      var itemsList = this.state.items;

      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].checked) {
          itemsList.splice(i, 1);
          i -= 1;
        }
      }

      this.setState({ items: itemsList });
      this.setState({ leftCount: this.countLeft(itemsList) });
      this.setState({ search: '' });
      (0, _Store.storeSave)(this.state.items);
      this.alert("Completed tasks were successfully deleted!", true, "success");
      reloadCounter++;
    }

    // Check all tasks function

  }, {
    key: 'checkAll',
    value: function checkAll() {
      var itemsList = this.state.items;

      for (var i = 0; i < itemsList.length; i++) {
        itemsList[i].checked = true;
      }

      this.setState({ items: itemsList });
      this.setState({ leftCount: this.countLeft(itemsList) });
      this.setState({ search: '' });
      this.alert("All tasks were completed", true, "success");
      (0, _Store.storeSave)(this.state.items);
      reloadCounter++;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'todo-wrapper flexing' },
        _react2.default.createElement(
          'div',
          { id: 'todo' },
          _react2.default.createElement(
            'h2',
            { className: 'app-title' },
            'To do List'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Productive work is impossible without structure'
          ),
          _react2.default.createElement(_New2.default, { value: this.state.search,
            handleAdd: this.handleAdd,
            handleSearch: this.handleSearch }),
          _react2.default.createElement(
            _reactRouter.Router,
            { history: _reactRouter.browserHistory, key: reloadCounter },
            _react2.default.createElement(_reactRouter.Route, { path: '/', component: function component() {
                return routeComponent("all", _this2);
              } }),
            _react2.default.createElement(_reactRouter.Route, { path: '/active', component: function component() {
                return routeComponent("active", _this2);
              } }),
            _react2.default.createElement(_reactRouter.Route, { path: '/completed', component: function component() {
                return routeComponent("completed", _this2);
              } })
          )
        )
      );
    }
  }]);

  return ToDoList;
}(_react.Component);

exports.default = ToDoList;

});

require.register("components/Todo/utils/Filter.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = Filter;
// Filter function to distinguish betweet tasks
function Filter(items, type) {
  var result = [];
  switch (type) {
    case "active":
      for (var i = 0; i < items.length; i++) {
        if (!items[i].checked) {
          result.push(items[i]);
        }
      }
      break;
    case "completed":
      for (var _i = 0; _i < items.length; _i++) {
        if (items[_i].checked) {
          result.push(items[_i]);
        }
      }
      break;
    default:
      for (var _i2 = 0; _i2 < items.length; _i2++) {
        result.push(items[_i2]);
      }
      break;
  }

  return result;
}

});

;require.register("components/Todo/utils/IsBlank.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSpaces = removeSpaces;
exports.isBlank = isBlank;
function removeSpaces(string) {
  return string.replace(/\s{2,}/g, ' ');
}
// Check for input function
function isBlank(string) {
  string = removeSpaces(string);
  return string !== ' ' && string !== '';
}

});

;require.register("components/Todo/utils/Search.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = Search;
// Search through tasks function
function Search(items, search) {
  var result = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].value.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
      result.push(items[i]);
    }
  }

  return result;
}

});

;require.register("components/Todo/utils/Store.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeGet = storeGet;
exports.storeSave = storeSave;
function storeGet() {
  return JSON.parse(localStorage.getItem("Items"));
}

function storeSave(items) {
  localStorage.setItem("Items", JSON.stringify(items));
}

});

;require.register("components/Wiki/ResultList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SingleResult = require('./SingleResult');

var _SingleResult2 = _interopRequireDefault(_SingleResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component for displying the result of the request to Wikipedia on a webpage
var ResultList = function (_React$Component) {
  _inherits(ResultList, _React$Component);

  function ResultList() {
    _classCallCheck(this, ResultList);

    return _possibleConstructorReturn(this, (ResultList.__proto__ || Object.getPrototypeOf(ResultList)).apply(this, arguments));
  }

  _createClass(ResultList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var results = this.props.results[1].map(function (result, index) {
        return _react2.default.createElement(_SingleResult2.default, {
          key: index,
          title: _this2.props.results[1][index],
          description: _this2.props.results[2][index],
          url: _this2.props.results[3][index]
        });
      });

      return _react2.default.createElement(
        'div',
        { className: 'result-list' },
        results
      );
    }
  }]);

  return ResultList;
}(_react2.default.Component);

exports.default = ResultList;

});

require.register("components/Wiki/SearchForm.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component of Search Form
var SearchForm = function (_React$Component) {
  _inherits(SearchForm, _React$Component);

  function SearchForm() {
    _classCallCheck(this, SearchForm);

    var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this));

    _this.state = { searchTerm: '' };
    return _this;
  }

  _createClass(SearchForm, [{
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      this.setState({ searchTerm: e.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var searchTerm = this.state.searchTerm.trim();

      if (!searchTerm) {
        return;
      }

      this.props.onSearch(searchTerm);
      this.setState({ searchTerm: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'search-box-container' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit.bind(this) },
          _react2.default.createElement('input', {
            className: 'search-box-text',
            type: 'text',
            placeholder: 'Search...',
            onChange: this.handleInputChange.bind(this),
            value: this.state.searchTerm }),
          _react2.default.createElement(
            'p',
            { className: 'random-text' },
            _react2.default.createElement(
              'small',
              null,
              'or visit',
              _react2.default.createElement(
                'a',
                { href: 'http://en.wikipedia.org/wiki/Special:Random', target: '_blank' },
                ' a random article'
              ),
              '.'
            )
          )
        )
      );
    }
  }]);

  return SearchForm;
}(_react2.default.Component);

exports.default = SearchForm;

});

require.register("components/Wiki/SingleResult.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 
var SingleResult = function (_React$Component) {
  _inherits(SingleResult, _React$Component);

  function SingleResult() {
    _classCallCheck(this, SingleResult);

    return _possibleConstructorReturn(this, (SingleResult.__proto__ || Object.getPrototypeOf(SingleResult)).apply(this, arguments));
  }

  _createClass(SingleResult, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "a",
        { href: this.props.url, className: "single-result", target: "_blank" },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h3",
            null,
            this.props.title
          ),
          _react2.default.createElement(
            "p",
            null,
            this.props.description
          )
        )
      );
    }
  }]);

  return SingleResult;
}(_react2.default.Component);

exports.default = SingleResult;

});

require.register("components/Wiki/WikipediaViewer.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchForm = require('./SearchForm');

var _SearchForm2 = _interopRequireDefault(_SearchForm);

var _ResultList = require('./ResultList');

var _ResultList2 = _interopRequireDefault(_ResultList);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentJsonp = require('superagent-jsonp');

var _superagentJsonp2 = _interopRequireDefault(_superagentJsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WikipediaViewer = function (_React$Component) {
  _inherits(WikipediaViewer, _React$Component);

  function WikipediaViewer() {
    _classCallCheck(this, WikipediaViewer);

    var _this = _possibleConstructorReturn(this, (WikipediaViewer.__proto__ || Object.getPrototypeOf(WikipediaViewer)).call(this));

    _this.state = { results: ['', [], [], []] };
    return _this;
  }

  _createClass(WikipediaViewer, [{
    key: 'handleSearch',
    value: function handleSearch(searchTerm) {
      var _this2 = this;

      _superagent2.default.get('https://en.wikipedia.org/w/api.php').query({ search: searchTerm, action: 'opensearch', format: 'json' }).use(_superagentJsonp2.default).end(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          _this2.setState({ results: res.body });
        }
      });
      _superagent2.default.get('https://pl.wikipedia.org/w/api.php').query({ search: searchTerm, action: 'opensearch', format: 'json' }).use(_superagentJsonp2.default).end(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          _this2.setState({ results: res.body });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'wiki', className: 'flexing' },
        _react2.default.createElement(
          'h2',
          { className: 'app-title' },
          'Wikipedia Viewer'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Let\'s you to view and visit any article instantly as well as visit random article from Wiki database'
        ),
        _react2.default.createElement(_SearchForm2.default, { onSearch: this.handleSearch.bind(this) }),
        _react2.default.createElement(_ResultList2.default, { results: this.state.results })
      );
    }
  }]);

  return WikipediaViewer;
}(_react2.default.Component);

exports.default = WikipediaViewer;

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _WikipediaViewer = require('./components/Wiki/WikipediaViewer.jsx');

var _WikipediaViewer2 = _interopRequireDefault(_WikipediaViewer);

var _Calculator = require('./components/Calculator/Calculator.jsx');

var _Calculator2 = _interopRequireDefault(_Calculator);

var _ToDoList = require('./components/Todo/containers/ToDoList.jsx');

var _ToDoList2 = _interopRequireDefault(_ToDoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ToDoList2.default, null),
    _react2.default.createElement(_Calculator2.default, null),
    _react2.default.createElement(_WikipediaViewer2.default, null)
  ), document.querySelector('#apps'));
});

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map