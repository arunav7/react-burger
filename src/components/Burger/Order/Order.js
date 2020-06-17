import React from 'react'
import './Order.css'

const order = (props) => {
    const ingredients = []
    for (let igName in props.ingredients) {    // igNme = 'salad' ...
        ingredients.push({
            name: igName,
            quantity: props.ingredients[igName]  // qty of ingredients selected
        })
    }
    
    const ingOutput = ingredients.map(ig => (
        <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc'
            }}
        >{ig.name} ({ig.quantity})</span>
    ))

    return (
        <div className='Order'>
            <p>Ingredients: {ingOutput}</p>
            <p> Price: <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        </div>
    )
}

export default order