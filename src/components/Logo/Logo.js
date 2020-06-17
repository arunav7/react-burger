import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

// height props is received as a CSS style and it will override the default CSS style from Logo.css file
// if the props is not passed then the inline style will not be applied
const logo = (props) => (
    <div className='Logo' style={{height: props.height}}>
        <img src={burgerLogo} alt='MyBurger'/>
    </div>
)

export default logo