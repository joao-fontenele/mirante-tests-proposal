var React = require('react');
var HelpBlock = require('./HelpBlock.react');

var TextInput = React.createClass({

    render: function() {
        // console.log('TextInput render');
        var wrapperCls = this.props.componentName;
        if (this.props.wrapperCls) {
            wrapperCls += ' ' + this.props.wrapperCls;
        }
        if (this.props.errorMessage) {
            wrapperCls += ' has-error';
        }

        return (
            <div className={wrapperCls}>
                <label className={'label'} htmlFor={this.props.componentName}>
                    {this.props.label}
                </label>
                <input
                    value={this.props.value}
                    name={this.props.componentName}
                    ref="field"
                    className={'field'}
                    type={this.props.type}
                    onBlur={this.props.validate}
                    onChange={this.props.handleChange}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                />
                <HelpBlock
                    errorMessage={this.props.errorMessage}
                    helpBlockCls={this.props.helpBlockCls}
                />
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return (this.props.value !== nextProps.value) ||
                (this.props.errorMessage !== nextProps.errorMessage);
    },

});

TextInput.defaultProps = {
    type:         'text',
    errorMessage: null,
    placeholder:  '',
    wrapperCls:   '',
    validate:     null,
    disabled:     false,
};

TextInput.propTypes = {
    value:          React.PropTypes.string.isRequired,
    handleChange:   React.PropTypes.func.isRequired,
    label:          React.PropTypes.string.isRequired,
    componentName:  React.PropTypes.string.isRequired,
    type:           React.PropTypes.string,
    errorMessage:   React.PropTypes.string,
    placeholder:    React.PropTypes.string,
    wrapperCls:     React.PropTypes.string,
    validate:       React.PropTypes.func,
    disabled:       React.PropTypes.bool,
}

module.exports = TextInput;
