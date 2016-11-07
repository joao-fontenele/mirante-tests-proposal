var chai = require('chai');
var enzyme = require('enzyme');
var React = require('react');
var chaiEnzyme = require('chai-enzyme');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(chaiEnzyme());
chai.use(sinonChai);

var expect = chai.expect;
var shallow = enzyme.shallow;
var mount = enzyme.mount;

global.React = React;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.sinon = sinon;
