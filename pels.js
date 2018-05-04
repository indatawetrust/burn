var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var burn = function () {
  var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var DEFAULT_PARAMS = /=[^,]+/mg;
  var FAT_ARROWS = /=>.*$/mg;

  function getParameterNames(fn) {
    var code = fn.toString().replace(COMMENTS, '').replace(FAT_ARROWS, '').replace(DEFAULT_PARAMS, '');

    var result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);

    return result === null ? [] : result;
  }

  return function (f) {
    var _this = this;

    var params = getParameterNames(f);
    var elements = {};

    params = params.map(function (elem) {
      if (elem == '$') {
        return {
          get: function get(key) {
            return elements[key];
          },
          actions: {}
        };
      } else {
        return function () {
          for (var _len = arguments.length, item = Array(_len), _key = 0; _key < _len; _key++) {
            item[_key] = arguments[_key];
          }

          var _elem = document.createElement(elem);

          item.map(function (item) {
            if (item instanceof Element) {
              _elem.appendChild(item);
            } else {
              switch (typeof i === 'undefined' ? 'undefined' : _typeof(i)) {
                case 'object':
                  _elem.innerHTML = JSON.stringify(item);
                  break;
                default:
                  _elem.innerHTML = item;
                  break;
              }
            }
          });

          _elem.on = function (event, listener) {
            _this.addEventListener(event, listener);

            return elem;
          };

          _elem.attr = function (attrs) {
            for (var k in attrs) {
              var v = attrs[k];
              _elem.setAttribute(k, v);
            }
            return _elem;
          };

          _elem.set = function (key) {
            elements[key] = _elem;

            return _elem;
          };

          return _elem;
        };
      }
    });

    return f.apply(undefined, _toConsumableArray(params));
  };
}();
