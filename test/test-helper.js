var chai = require('chai');
var enzyme = require('enzyme');
var React = require('react');
var chaiEnzyme = require('chai-enzyme');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var jsdom = require('jsdom').jsdom;

chai.use(chaiEnzyme());
chai.use(sinonChai);

var expect = chai.expect;
var shallow = enzyme.shallow;
var mount = enzyme.mount;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function(property) {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.React = React;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.sinon = sinon;
