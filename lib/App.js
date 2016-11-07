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
        validate: function() {
          var simpleInput = self.state.simpleInput;
          simpleInput.error = (self.state.simpleInput.value === 'ass') ? "É uma cilada Bino!" : null
          self.setState({simpleInput: simpleInput});
        },
        handleChange: function(evt) {
          var simpleInput = self.state.simpleInput;
          simpleInput.value = evt.target.value
          self.setState({
            simpleInput: simpleInput
          });
        },
      },
    };
  },

  validate: function() {
    var simpleInput = this.state.simpleInput;
    simpleInput.error = (this.state.simpleInput.value === 'ass') ? "É uma cilada Bino!" : null
    this.setState({simpleInput: simpleInput});
  },

  handleSimpleInputChange: function(evt) {
    var simpleInput = this.state.simpleInput;
    simpleInput.value = evt.target.value
    this.setState({
      simpleInput: simpleInput
    });
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
        <TextInput
            value={this.state.simpleInput.value}
            handleChange={this.state.simpleInput.handleChange}
            validate={this.state.simpleInput.validate}
            componentName="simple-input"
            ref="input"
            label="some label"
            errorMessage={this.state.simpleInput.error}
            wrapperCls={wrapperCls}/>
        <input className="submit" type="Submit" onClick={this.handleSubmit} defaultValue="Submit"/>
      </form>
    );
  },

});

module.exports = App;
