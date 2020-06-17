import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

// Only for debugging purposes
// Need not to be class component
class OrderSummary extends React.Component {
    componentWillUpdate() {
        console.log('[OrderSummary] Will Update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span>
                </li>
            )
        })
        
        return (
            <Aux>
                <p>Your Order</p>
                <ul>
                    {ingredientSummary}
                </ul>
                    <p>Total Price: <strong>Rs.{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
} 

export default OrderSummary