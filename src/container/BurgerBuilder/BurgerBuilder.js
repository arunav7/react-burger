import React, {Component} from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {                   
        purchasing: false,                  // for displaying the Modal
        loading: false,                     // for handling the Spinner   
        error: false                        // for handling errors
    }

    // for enabling and disabling the button place orders
    updatePurchasable() {
        const sum = Object.keys(this.props.ings)
            .map(igKey => {
                return this.props.ings[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0  // sum = 0 indicates no ingredients are added, hence cannot place order 
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    // fetching data from server after this component mounts
    componentDidMount() {
        // axios.get('https://my-burger-1382c.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })    // setting the state of ingredients = fetched data from server
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {                    // key is the items in ingredient i.e salad, meat ...
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Structure of disabledInfo is like this:
        // {salad:true},{cheese: false} ...
        // if the count is 0 then the button would be disabled i.e disabledInfo[key] will become false 
        let orderSummary = null
        let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded!</p> : <Spinner />
        
        // if check is necessary because initial state of ingredients is set to null
        // and if this is omitted then the application will break because we are fetching data after BurgerBuilder gets mount
        // so all the components which are dependent on the ingredient state will crash 
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientsAdded = {this.props.onAddIngredients}
                        ingredientsRemoved = {this.props.onRemoveIngredients}
                        disabled = {disabledInfo}
                        purchasable = {this.updatePurchasable()}
                        price = {this.props.price}
                        ordered = {this.purchaseHandler} />
                </Aux>
            )
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
        }
        if(this.state.loading)
            orderSummary = <Spinner />

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    ings: state.ingredients,
    price: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
    onAddIngredients: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
    onRemoveIngredients: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))