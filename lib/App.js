var React = require('react');
// var TagsInput = require('./TagsInput');
var TextInput = require('./TextInput.react');
var InputList = require('./InputList.react')

var App = React.createClass({
  getInitialState: function() {
    var self = this;
    return {
      simpleInput: {
        value: '',
        error: null,
      },
      list: [{
        value: '',
        label: 'Some label',
        componentName: 'first',
        errorMessage: '',
      },],
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

  handleChange: function(i, evt) {
      this.state.list[i].value = evt.target.value;
      this.setState({list: this.state.list});
  },

  handleRemove: function(i, evt) {
      this.state.list.splice(i, 1);
      this.setState({list: this.state.list});
  },

  validate: function(i, evt) {
      console.log('validate, i', i, 'evt', evt);
      var input = this.state.list[i];
      input.errorMessage = (input.value === 'ass') ? "É uma cilada Bino!" : null
      this.setState({list: this.state.list});
  },

  handleAddNewInput: function() {
      this.state.list.push({
          handleChange: this.handleChange,
          handleRemove: this.handleRemove,
          value: '',
          label: 'Some random label',
          componentName: '' + this.state.list.length + 1,
          errorMessage: '',
      });
      this.setState({list: this.state.list});
      this.forceUpdate();
  },

  handleSubmit: function(evt) {
    evt.preventDefault();
    var el = this.refs.input;
  },

  logState: function() {
      console.log('state', this.state);
  },

  render: function() {
      return (
          <form className="example-form">
              <InputList
                  componentName="list"
                  handleAdd={this.handleAddNewInput}
                  list={this.state.list}
                  handleChange={this.handleChange}
                  handleRemove={this.handleRemove}
                  validate={this.validate}
              />
              <input type="button" value="Log state" onClick={this.logState}/>
          </form>
      );
  },

  renderOld: function() {
    var wrapperCls = '1 2';
    return (
      <form className="example-form">
        <TextInput
            value={this.state.simpleInput.value}
            errorMessage={this.state.simpleInput.error}
            handleChange={this.handleChangeSimpleInput}
            handleRemove={this.handleRemoveSimpleInput}
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
