var chai = require('chai');
var enzyme = require('enzyme');
var React = require('react');
var chaiEnzyme = require('chai-enzyme');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var TextInput = require('../lib/TextInput.react');

var expect = chai.expect;
var shallow = enzyme.shallow;
var mount = enzyme.mount;

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('A TextInput component,', function() {
    var wrapper;
    var minProps = {
        value: 'initial',
        label: 'a test label',
        componentName: 'test-input',
        handleChange: function(evt) {}
    };

    it('renders without exploding', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(shallow(<TextInput {...minProps} />)).to.exist;
    });

    it('should have a label element passed by props', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(wrapper.find('.label')).to.contain(minProps.label);
    });

    it('should have a componentName that is present in the class of the component', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(wrapper).to.have.className(minProps.componentName);
    });

    it('should not add more classes passed by props to the component if no extra classes are given', function() {
        wrapper = shallow(<TextInput {...minProps} errorMessage={null} wrapperCls={null} />);
        expect(wrapper).to.have.exactly.className(minProps.componentName)
    })

    it('should not add a has-error class if there\'s an error message', function() {
        wrapper = shallow(<TextInput {...minProps} errorMessage="some error" />);
        expect(wrapper).to.have.className('has-error');
    })

    it('should add more classes passed by props to the component', function() {
        var cls = '-compact _centered;'
        wrapper = shallow(<TextInput {...minProps} wrapperCls={cls} />);
        expect(wrapper).to.have.className(cls)
    })

    context('should have a HelpBlock component,', function() {
        it('that exists', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            expect(wrapper.find('HelpBlock')).to.exist;
        });

        it('that reveives empty props when there\'s no error', function() {
            wrapper = shallow(<TextInput {...minProps} errorMessage={null}/>);
            var help = wrapper.find('HelpBlock');
            expect(help).to.have.prop('errorMessage', null);
        });

        it('that reveives a string with an error message in the props when there\'s an error', function() {
            var err = "some error ocurred";
            wrapper = shallow(<TextInput {...minProps} errorMessage={err} />);
            var help = wrapper.find('HelpBlock');
            expect(help).to.have.prop('errorMessage', err);
        });
    });

    context('should have an input field element,', function() {
        it('that has a class field', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            var field = wrapper.find('input');
            expect(field).to.have.className('field')
        });

        it('that displays it\'s value property', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            var field = wrapper.find('input');
            expect(field).to.have.attr('value', minProps.value);
        });

        it('that changes it\'s value when the parent changes it\'s props', function() {
            var newVal = 'after change';
            wrapper = shallow(<TextInput {...minProps} />);
            wrapper.setProps({value: newVal});
            var field = wrapper.find('input');

            expect(field).to.not.have.attr('value', minProps.value);
            expect(field).to.have.attr('value', newVal);
        });

        it('that displays the placeholder passed by props', function() {
            wrapper = shallow(<TextInput {...minProps} placeholder="ph" />);
            var field = wrapper.find('.field');
            expect(field).to.have.attr('placeholder', "ph");
        });

        it('that uses the type passed by props', function() {
            wrapper = shallow(<TextInput {...minProps} type="email"/>);
            var field = wrapper.find('.field');
            expect(field).to.have.attr('type', "email");
        });

        it('that is not disabled if the disabled prop is false', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            var field = wrapper.find('.field');
            expect(field).to.not.be.disabled;
        });

        it('that is disabled if the disabled prop is true', function() {
            wrapper = shallow(<TextInput {...minProps} disabled />);
            var field = wrapper.find('.field');
            expect(field).to.be.disabled;
        });
    });

    context('should call the callback validation properly', function() {
        // TODO how exactly to test this? if I pass null as the validation rule,
        // it cant be a sinon spy, and without a spy i cant possibly know if
        // it has been called or not
        it('doesn\'t call the parent\'s validation, if it\'s not passed');

        it('calls the parent\'s validation if it\'s passed by props and the field blurs', function() {
            var validation = sinon.spy();

            wrapper = shallow(<TextInput {...minProps} validate={validation} />);
            wrapper.find('.field').simulate('blur');

            expect(validation).to.have.been.called.once;
        });
    });

    context('should call the callback on changes properly', function() {
        it('calls the parent\'s changeHandler on changes', function() {
            var handler = sinon.spy();

            wrapper = shallow(<TextInput {...minProps} handleChange={handler} />);
            wrapper.find('.field').simulate('change');

            expect(handler).to.have.been.called.once;
        });
    });

});
