import * as actionTypes from '../actions/actions'
import {addIngredient, removeIngredient, setIngredient, fetchError } from './burgerBuilderUtility'

const initialState = {
    ingredients: null,
    totalPrice: 10.75,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENT:
            return setIngredient(state, action)
        case actionTypes.FETCH_ERROR:
            return fetchError(state)
        default:
            return state    
    }
}

export default reducer