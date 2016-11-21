import IQSelect from '../index';
import React from 'react';
import options from '../__mocks__/options';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

jest.mock('../styles.styl', () => {});

it('Should render component', () => {
    const component = renderer.create(<IQSelect options={options} label='Test label'/>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should add focus mod', () => {
    const component = mount(<IQSelect options={options} label='Test label' />);

    component.find('.IQSelect__input').simulate('focus');
    expect(component.find('.IQSelect').hasClass('IQSelect_focus_true')).toBe(true);
});

it('Should remove focus mod', () => {
    const component = mount(<IQSelect options={options} label='Test label' />);

    component.find('.IQSelect__input').simulate('focus');
    component.find('.IQSelect__input').simulate('blur');
    expect(component.find('.IQSelect').hasClass('IQSelect_focus_false')).toBe(true);
});

it('Should add hasValue mod', () => {
    const component = mount(<IQSelect options={options} value="a" label='Test label' />);

    expect(component.find('.IQSelect').hasClass('IQSelect_hasValue_true')).toBe(true);
});

it('Should set value on option click', () => {
    const component = mount(<IQSelect name="testSelect" options={options} value="a" label='Test label' />);

    component.find('.IQSelect__input').simulate('focus');
    component.find('.IQSelect__option[data-value="b"]').simulate('mouseDown');
    expect(component.instance().value).toBe('b');
});