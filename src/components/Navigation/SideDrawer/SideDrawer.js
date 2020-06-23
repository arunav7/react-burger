import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

// passing height props in logo to dynamically set the CSS height for a particular component
// in this case as 11%
const sideDrawer = (props) => {
    let classes = ['SideDrawer', 'Close']
    if(props.open)
        classes = ['SideDrawer', 'Open']
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(' ')}>
                <Logo height='10%' className='Logo'/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>   
    )
}

export default sideDrawer