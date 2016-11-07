var HelpBlock = require('../lib/HelpBlock.react');

describe('A HelpBlock component,', function() {

    it('renders without exploding', function() {
        expect(shallow(<HelpBlock />)).to.exist;
    });

    context('should display nothing when there\'s no error message,', function() {
        it('like null', function() {
            var wrapper = shallow(<HelpBlock errorMessage={null} />);
            expect(wrapper.find('span')).to.be.empty;
        });

        it('like an empty string', function() {
            var wrapper = shallow(<HelpBlock errorMessage={""} />);
            expect(wrapper.find('span')).to.be.empty;
        });
    });

    context('when threre\'s an error, should display', function() {
        var wrapper;
        var errorMessage;
        beforeEach(function() {
            errorMessage = 'É uma cilada Bino!';
            wrapper = shallow(<HelpBlock errorMessage={errorMessage} />);
        });

        it('the right error message', function() {
            expect(wrapper.find('span')).to.contain(errorMessage);
        });

        it('and not the wrong error message', function() {
            var wrongMessage = 'this should not appear';
            expect(wrapper.find('span')).to.not.contain(wrongMessage);
        });
    });

    context('should have the classes', function() {
        var wrapper;
        var classes;
        beforeEach(function() {
            wrapper = shallow(<HelpBlock />);
        });

        it('help-block', function() {
            expect(wrapper.find('span')).to.have.className('help-block');
        });

        it('and not some other random classes', function() {
            expect(wrapper.find('span')).to.not.have.className('DUMMYCLASS');
        });
    });

});
