import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className='BuildControls'>
        <p>Price: <strong>Rs.{props.price.toFixed(2)}/-</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added = {() => props.ingredientsAdded(ctrl.type)}
                removed = {() => props.ingredientsRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]} />
        ))}
        <button 
            className='OrderButton'
            disabled={!props.purchasable}
            onClick={props.ordered}>Place Order</button>
    </div>
)

export default buildControls
