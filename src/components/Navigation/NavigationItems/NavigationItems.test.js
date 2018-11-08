import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });
    it('should render two <NavigationItem> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render four <NavigationItem> elements if authenticated', () => {
        wrapper.setProps({authEmail: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });
    it('should have <NavigationItem> element with link "logout" if user is authenticated', () => {
        wrapper.setProps({authEmail: true,});
        expect(wrapper.contains(<NavigationItem link='/logout'>Log out</NavigationItem>)).toEqual(true);
    });
});
