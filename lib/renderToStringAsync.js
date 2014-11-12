var React = require('react');
var createClass = require('./createClass');


function renderToStringAsync(component, cb) {

  var Fiber;
  try {
    Fiber = require('fibers');
  } catch (err) {
    console.error('install fibers: npm install fibers');
    throw err;
  }

  Fiber(function () {
    try {
      var markup = React.renderToString(component);
      cb(null, markup);
    } catch (e) {
      cb(e);
    } finally {
      createClass.cleanAllSubscriptions();
    }
  }).run();
}

module.exports = renderToStringAsync;