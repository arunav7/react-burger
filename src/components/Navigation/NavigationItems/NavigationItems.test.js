import React from 'react'

import { configure, shallow } from 'enzyme'
import adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new adapter() })

describe('<NavigationItems />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })
    
    it('should render 2 nav items while unauthenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render 2 nav items while authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>)
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render logout nav item while authenticated', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    })
})
