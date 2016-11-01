var React = require('react');
var HelpBlock = require('./HelpBlock.react');

var Input = React.createClass({
    callValidate: function() {
        console.log('Input called validate');
        if (this.props.validate) {
            this.props.validate(this.getContent());
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        console.log('Input cwu called');
    },

    getContent: function() {
        var content = this.refs.field.value.trim();
        console.log('content:', content);
        return content;
    },

    render: function() {
        console.log('Input render');
        var wrapperCls = 'wrapper ' + this.props.wrapperCls;
        if (this.props.errorMessage) {
            wrapperCls = 'has-error ' + wrapperCls;
        }

        var labelCls = 'label ' + this.props.labelCls;
        var fieldCls = 'field ' + this.props.fieldCls;

        return (
            <div className={wrapperCls} id={this.props.wrapperId}>
                <label className={labelCls} htmlFor={this.props.name}>
                    {this.props.label}
                </label>
                <input
                    ref="field"
                    className={fieldCls}
                    type={this.props.type}
                    onBlur={this.callValidate}
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
        console.log('Input scu called');
        return (this.props.errorMessage !== nextProps.errorMessage);
    },

});

Input.defaultProps = {
    wrapperId:    null,
    type:         'text',
    placeholder:  '',
    wrapperCls:   '',
    labelCls:     '',
    fieldCls:     '',
    validate:     null,
    disabled:     false,
};

Input.propTypes = {
    label:        React.PropTypes.string.isRequired,
    wrapperId:    React.PropTypes.string,
    type:         React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    wrapperCls:   React.PropTypes.string,
    labelCls:     React.PropTypes.string,
    fieldCls:     React.PropTypes.string,
    helpBlockCls: React.PropTypes.string,
    validate:     React.PropTypes.func,
    disabled:     React.PropTypes.bool,
}

module.exports = Input;
