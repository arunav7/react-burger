import React from 'react'
import { configure, shallow } from 'enzyme'
import adapter from 'enzyme-adapter-react-16'

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new adapter() })

describe('<BurgerBuilder />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })
    
    it('should render <BuildControls />, while receiveing ings',() => {
        wrapper.setProps({ ings: { salad: 0 } })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
