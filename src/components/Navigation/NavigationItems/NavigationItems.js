import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className='NavigationItems'>
        {/* <NavigationItem link='/' exact>BurgerBuilder</NavigationItem> */}
        <NavigationItem link='/'>BurgerBuilder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        { !props.isAuthenticated 
            ? <NavigationItem link='/auth'>Authenticate</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>     
        }

    </ul>
)

export default navigationItems