import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
    salad: 10.00,
    bacon: 30.45,
    cheese: 20.00,
    meat: 30.25
}

export const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients,  updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

export const removeIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients,  updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

export const setIngredient = (state, action) => {
    const updatedState = {
        ingredients: action.ingredients,
        totalPrice: 10.75,                // Resetting the price after order is placed
        error: false,
        building: false
    }
    return updateObject(state, updatedState)
}

export const fetchError = (state) => {
    return updateObject(state, {error: true})
}
