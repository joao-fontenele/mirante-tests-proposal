var React = require('react');
// var TagsInput = require('./TagsInput');
var TextInput = require('./TextInput.react');

var App = React.createClass({
  getInitialState: function() {
    var self = this;
    return {
      simpleInput: {
        value: '',
        error: null,
      },
    };
  },

  validateSimpleInput: function() {
    var simpleInput = this.state.simpleInput;
    simpleInput.error = (this.state.simpleInput.value === 'ass') ? "É uma cilada Bino!" : null
    this.setState({simpleInput: simpleInput});
  },

  handleChangeSimpleInput: function(evt) {
    var simpleInput = this.state.simpleInput;
    simpleInput.value = evt.target.value
    this.setState({
      simpleInput: simpleInput
    });
  },

  handleSubmit: function(evt) {
    evt.preventDefault();
    var el = this.refs.input;
  },

  render: function() {
    var wrapperCls = '1 2';
    return (
      <form className="example-form">
        <TextInput
            value={this.state.simpleInput.value}
            errorMessage={this.state.simpleInput.error}
            handleChange={this.handleChangeSimpleInput}
            validate={this.validateSimpleInput}
            componentName="simple-input"
            ref="input"
            label="some label"
            wrapperCls={wrapperCls} />
        <input className="submit" type="Submit" onClick={this.handleSubmit} defaultValue="Submit"/>
      </form>
    );
  },

});

module.exports = App;
