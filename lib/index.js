'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regeneratorRuntime = require("regenerator-runtime");
var fetch = require('node-fetch');
global.Headers = fetch.Headers;

var Lyrid = function () {
  function Lyrid(key, secret) {
    var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, Lyrid);

    this.key = key;
    this.secret = secret;
    this.token = token;
    this.endpoint = 'https://api.lyrid.io';
    this.executeEndpoint = '';

    this.getRequest = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var token, lyridHeaders, requestOptions, response, status, resBody;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getToken();

              case 2:
                token = _context.sent;
                lyridHeaders = new Headers();

                lyridHeaders.append("Content-Type", "application/json");
                lyridHeaders.append("Authorization", "Bearer " + token);
                requestOptions = {
                  method: 'GET',
                  mode: "cors",
                  headers: lyridHeaders,
                  redirect: 'follow'
                };
                _context.next = 9;
                return fetch(url, requestOptions);

              case 9:
                response = _context.sent;

                console.log(response);
                _context.next = 13;
                return response.status;

              case 13:
                status = _context.sent;

                console.log(status);

                if (!(status >= 200 && status < 300)) {
                  _context.next = 21;
                  break;
                }

                _context.next = 18;
                return response.json();

              case 18:
                return _context.abrupt('return', _context.sent);

              case 21:
                _context.next = 23;
                return response.text();

              case 23:
                resBody = _context.sent;

                if (!(resBody == "Expired authorization token")) {
                  _context.next = 30;
                  break;
                }

                _context.next = 27;
                return this.refreshToken();

              case 27:
                _context.next = 29;
                return this.getRequest(url);

              case 29:
                return _context.abrupt('return', _context.sent);

              case 30:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();

    this.getToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = this.token;

              if (token) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return this.refreshToken();

            case 4:
              token = _context2.sent;

            case 5:
              return _context2.abrupt('return', token);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    this.refreshToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var token, requestOptions, response, status, json;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              token = '';
              requestOptions = {
                method: 'POST',
                headers: new Headers().append("Content-Type", "application/json"),
                body: JSON.stringify({ "key": this.key, "secret": this.secret }),
                redirect: 'follow'
              };
              _context3.next = 4;
              return fetch(this.endpoint + "/auth", requestOptions);

            case 4:
              response = _context3.sent;
              _context3.next = 7;
              return response.status;

            case 7:
              status = _context3.sent;

              if (!(status >= 200 && status < 300)) {
                _context3.next = 16;
                break;
              }

              _context3.next = 11;
              return response.json();

            case 11:
              json = _context3.sent;
              _context3.next = 14;
              return json.token;

            case 14:
              this.token = _context3.sent;

              token = this.token;

            case 16:
              return _context3.abrupt('return', token);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));
  }

  _createClass(Lyrid, [{
    key: 'setEndpoint',
    value: function setEndpoint(endpoint) {
      this.endpoint = endpoint;
    }
  }, {
    key: 'setExecuteEndpoint',
    value: function setExecuteEndpoint(endpoint) {
      this.executeEndpoint = endpoint;
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var framework = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var inputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var token, requestEndpoint, lyridHeaders, requestOptions, response, status, resBody;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log("executing a function");
                _context4.next = 3;
                return this.getToken();

              case 3:
                token = _context4.sent;
                requestEndpoint = this.endpoint + '/api/serverless/app/execute/' + id + "/" + framework;

                if (this.executeEndpoint.length > 0) {
                  requestEndpoint = this.executeEndpoint;
                }
                lyridHeaders = new Headers();

                lyridHeaders.append("Content-Type", "application/json");
                lyridHeaders.append("Authorization", "Bearer " + token);
                requestOptions = {
                  method: 'POST',
                  headers: lyridHeaders,
                  body: inputs,
                  redirect: 'follow'
                };
                _context4.next = 12;
                return fetch(requestEndpoint, requestOptions);

              case 12:
                response = _context4.sent;

                console.log(response);
                _context4.next = 16;
                return response.status;

              case 16:
                status = _context4.sent;

                console.log(status);

                if (!(status >= 200 && status < 300)) {
                  _context4.next = 24;
                  break;
                }

                _context4.next = 21;
                return response.json();

              case 21:
                return _context4.abrupt('return', _context4.sent);

              case 24:
                _context4.next = 26;
                return response.text();

              case 26:
                resBody = _context4.sent;

                if (!(resBody == "Expired authorization token")) {
                  _context4.next = 33;
                  break;
                }

                _context4.next = 30;
                return this.refreshToken();

              case 30:
                _context4.next = 32;
                return this.execute(id, framework, inputs);

              case 32:
                return _context4.abrupt('return', _context4.sent);

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function execute(_x5) {
        return _ref4.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: 'executeByName',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(app, module, tag, functionName, inputs) {
        var token, authorization, requestEndpoint, lyridHeaders, requestOptions, response, status;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log("executing a function by name");
                token = this.key + ":" + this.secret;
                authorization = "Basic " + btoa(token);
                requestEndpoint = this.endpoint + '/x/' + app + '/' + module + '/' + tag + '/' + functionName;

                if (this.executeEndpoint.length > 0) {
                  requestEndpoint = this.executeEndpoint;
                }
                lyridHeaders = new Headers();

                lyridHeaders.append("Content-Type", "application/json");
                lyridHeaders.append("Authorization", authorization);
                requestOptions = {
                  method: 'POST',
                  headers: lyridHeaders,
                  body: inputs,
                  redirect: 'follow'
                };
                _context5.next = 11;
                return fetch(requestEndpoint, requestOptions);

              case 11:
                response = _context5.sent;

                console.log(response);
                _context5.next = 15;
                return response.status;

              case 15:
                status = _context5.sent;

                console.log(status);

                if (!(status >= 200 && status < 300)) {
                  _context5.next = 23;
                  break;
                }

                _context5.next = 20;
                return response.json();

              case 20:
                return _context5.abrupt('return', _context5.sent);

              case 23:
                _context5.next = 25;
                return response.text();

              case 25:
                return _context5.abrupt('return', _context5.sent);

              case 26:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function executeByName(_x6, _x7, _x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return executeByName;
    }()

    // api/serverless/app/get

  }, {
    key: 'getApps',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var requestEndpoint;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log("Get apps");
                requestEndpoint = this.endpoint + '/api/serverless/app/get';
                _context6.next = 4;
                return this.getRequest(requestEndpoint);

              case 4:
                return _context6.abrupt('return', _context6.sent);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getApps() {
        return _ref6.apply(this, arguments);
      }

      return getApps;
    }()

    // api/serverless/app/get/{appid}

  }, {
    key: 'getModules',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(appId) {
        var requestEndpoint;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log("Get Modules");
                requestEndpoint = this.endpoint + '/api/serverless/app/get/' + appId;
                _context7.next = 4;
                return this.getRequest(requestEndpoint);

              case 4:
                return _context7.abrupt('return', _context7.sent);

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getModules(_x11) {
        return _ref7.apply(this, arguments);
      }

      return getModules;
    }()

    // api/serverless/app/get/{appid}/{moduleid}

  }, {
    key: 'getRevisions',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(appId, moduleId) {
        var requestEndpoint;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log("Get Revisions");
                requestEndpoint = this.endpoint + '/api/serverless/app/get/' + appId + '/' + moduleId;
                _context8.next = 4;
                return this.getRequest(requestEndpoint);

              case 4:
                return _context8.abrupt('return', _context8.sent);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getRevisions(_x12, _x13) {
        return _ref8.apply(this, arguments);
      }

      return getRevisions;
    }()

    // api/serverless/app/get/{appid}/{moduleid}/{revisionid}

  }, {
    key: 'getFunctions',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(appId, moduleId, revisionId) {
        var requestEndpoint;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log("Get functions");
                requestEndpoint = this.endpoint + '/api/serverless/app/get/' + appId + '/' + moduleId + '/' + revisionId;
                _context9.next = 4;
                return this.getRequest(requestEndpoint);

              case 4:
                return _context9.abrupt('return', _context9.sent);

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getFunctions(_x14, _x15, _x16) {
        return _ref9.apply(this, arguments);
      }

      return getFunctions;
    }()
  }]);

  return Lyrid;
}();

module.exports = Lyrid;