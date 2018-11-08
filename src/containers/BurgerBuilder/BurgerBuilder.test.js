import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Purchase from '../../components/Burger/Purchase/Purchase';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onLoadIngredients={()=>{}}/>);
    });
    it('should contain <Burger>, <BuildControls> and <Purchase> when receiving ingredients', () => {
        wrapper.setProps({ing: {salad: 0}, totalPrice: 0});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
        expect(wrapper.find(Burger)).toHaveLength(1);
        expect(wrapper.find(Purchase)).toHaveLength(1);
    });
    it('should show reload page link when props contain error', () => {
        wrapper.setProps({totalPrice: 0, error: 'here is error'});
        expect(wrapper.contains( <a href='/' className="ml-0 btn btn-large btn-warning">Reload page</a>)).toEqual(true);
    });
});
