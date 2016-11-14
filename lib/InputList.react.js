var React = require('react');
var TextInput = require('./TextInput.react');

var InputList = React.createClass({

    render: function() {
        var self = this;
        var remove;
        if (this.props.list.length > this.props.minLength) {
            remove = this.props.handleRemove;
        }
        var inputs = this.props.list.map(function(el, i) {
            return (
                <TextInput
                    key={i}
                    handleChange={self.props.handleChange.bind(null, i)}
                    handleRemove={remove ? self.props.handleRemove.bind(null, i) : null}
                    validate={self.props.validate ? self.props.validate.bind(null, i) : null}
                    value={el.value}
                    label={el.label}
                    componentName={el.componentName}
                    errorMessage={el.errorMessage}
                />
            );
        });

        return (
            <div
                className={this.props.componentName}
            >
                {inputs}
                <input
                    type="button"
                    onClick={this.props.handleAdd}
                    value="Add"
                />
            </div>
        );
    },

    propTypes: {
        componentName: React.PropTypes.string.isRequired,
        list: React.PropTypes.array.isRequired, // TODO the array should have a structure at least with the TextInput minProps
        handleAdd: React.PropTypes.func.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        handleRemove: React.PropTypes.func.isRequired,
        validate: React.PropTypes.func,
        min: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
          minLength: 0,
        };
    }
});

module.exports = InputList;
