import React from 'react'
import './NavigationItem.css'
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => {
    // const activeClass = 'active'
    return (
        <li className='NavigationItem'>
            {/* <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink> */}
            <NavLink to={props.link} exact>{props.children}</NavLink>
        </li>
    )
}

export default navigationItem