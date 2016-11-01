var chai = require('chai'); // provides de 'expect' style assertions
var enzyme = require('enzyme'); // provides shallow rendering, and custom assertions for react components
var React = require('react'); // though it's not used directly it needs to be in scope, it seems
var chaiEnzyme = require('chai-enzyme'); // improves the tests of the enzyme lib, incorporating enzyme's assertions into chai
var HelpBlock = require('../lib/HelpBlock.react'); // the component to be tested

var expect = chai.expect;
var shallow = enzyme.shallow;

chai.use(chaiEnzyme());

/*
 * We currently have mocha, chai and jest in our project. I suggest we substitute
 * jest (test runner, renderer, and assertions lib), to use mocha (test runner),
 * chai (assertions), and enzyme (renderer).
 *
 * Why enzyme instead of jest? The jest lib is considered kinda slow, among
 * other problems, besides the own React docs suggests enzyme.
 *
 * enzyme mentioned at react docs (https://facebook.github.io/react/docs/test-utils.html)
 * one of many examples of ppl with problems with jest (https://www.reddit.com/r/reactjs/comments/46cwj3/whats_february_2016s_best_alternative_to_jest_i/)
 *
 * there're some tests that are expected to fail, just to show the error messages,
 * to make a point of the use of the chai-enzyme lib.
 *
 * seting up and running:
 * npm install ; npm run test
 */

describe('A HelpBlock component,', function() {

    // these tests should fail. They serve to make a point of why the use of the
    // chai-enzyme lib is better.
    // In case it's not clear, it provides more significative/readable tests and
    // error messages, than simply using enzyme.
    // change to 'xcontext' or 'context.skip' to ignore these tests
    context('should fail just to show the assertion error messages,', function() {
        var classes;
        var errorMessage;
        var wrapper;
        beforeEach(function() {
            classes = ['dummyClass', 'has-error'];
            errorMessage = 'É uma cilada Bino!';
            wrapper = shallow(
                <HelpBlock
                    helpBlockCls={classes.join(' ')}
                    errorMessage={errorMessage}
                />
            );
        });

        // the following 2 tests, test the exact same thing
        it('using chai-enzyme ex1', function() {
            // note that the test is closer to be read as natural language
            expect(wrapper.find('span')).to.contain(errorMessage + 'BUG');
        });
        it('using enzyme only ex1', function() {
            // note that the main assertion stays inside the expect()
            expect(wrapper.find('span').children().contains(errorMessage + 'BUG')).to.be.true;
        });

        // the following 2 tests, test the exact same thing
        it('using chai-enzyme ex2', function() {
            expect(wrapper.find('span')).to.have.className(classes[0] + 'BUG');
        });
        it('using enzyme only ex2', function() {
            expect(wrapper.find('span').hasClass(classes[0] + 'BUG')).to.be.true;
        });

        // the following 2 tests, test the exact same thing
        it('using chai-enzyme ex3', function() {
            expect(wrapper.find('span')).to.be.empty;
        });
        it('using enzyme only ex3', function() {
            expect(wrapper.find('span').children()).to.have.length(0);
        });
    }); // end of the failing tests

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
            classes = ['dummyClass', 'has-error'];
            wrapper = shallow(<HelpBlock helpBlockCls={classes.join(' ')} />);
        });

        it('help-block', function() {
            expect(wrapper.find('span')).to.have.className('help-block');
        });

        it('and any aditional classes passed by props', function() {
            expect(wrapper.find('span')).to.have.className(classes[0]);
            expect(wrapper.find('span')).to.have.className(classes[1]);
        });

        it('and not some other random classes', function() {
            expect(wrapper.find('span')).to.not.have.className('DUMMYCLASS');
        });
    });

});
