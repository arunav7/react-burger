import React from 'react'
import './Button.css'

const button = (props) => {
    const btnClass = props.btnType
    const defaultClass = 'Button'
    const classes = [defaultClass, btnClass]
    return(
        <button 
            disabled={props.disabled}
            className={classes.join(' ')}
            onClick={props.clicked}>{props.children}</button>
    )
}
    
export default button