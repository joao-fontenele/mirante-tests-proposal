var React = require('react');
// var TagsInput = require('./TagsInput');
var Input = require('./Input.react');

var App = React.createClass({
  getInitialState: function() {
    return {
      error: null
    };
  },

  handleSubmit: function(evt) {
    evt.preventDefault();
    console.log('handle submit');
    var el = this.refs.input;
    console.log('el:', el, el.getContent());

  },

  render: function() {
    var wrapperCls = '1 2';
    return (
      <form className="example-form">
        <Input wrapperId="myId" validate={this.validate} ref="input" label="some label" errorMessage={this.state.error} wrapperCls={wrapperCls}/>
        <input className="submit" type="Submit" onClick={this.handleSubmit} defaultValue="Submit"/>
      </form>
    );
  },

  isTagAllowed: function() {
    return true;
  },

  validate: function(content) {
    var state = {};
    state.error = (content === 'ass') ? "É uma cilada Bino!" : null
    this.setState(state);
  },

});

module.exports = App;
