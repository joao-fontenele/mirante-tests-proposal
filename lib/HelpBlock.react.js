var React = require('react');

var HelpBlock = React.createClass({
    componentWillUpdate: function(nextProps, nextState) {
        // console.log('HelpBlock cwu');
    },

    render: function() {
        // console.log('HelpBlock render');
        var icon;
        var helpCls = 'help-block ' + this.props.helpBlockCls;
        if (this.props.errorMessage) {
            icon = (<i className="glyphicon glyphicon-alert">&nbsp;</i>);
        }
        return (
            <span className={helpCls}>
                {icon}
                {this.props.errorMessage}
            </span>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // console.log('HelpBlock scu');
        return (this.props.errorMessage !== nextProps.errorMessage);
    },
});

HelpBlock.defaultProps = {
    errorMessage: null,
    helpBlockCls: '',
};

HelpBlock.propTypes = {
    errorMessage: React.PropTypes.string,
    helpBlockCls: React.PropTypes.string,
};

module.exports = HelpBlock;
