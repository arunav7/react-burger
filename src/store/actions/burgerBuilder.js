import * as actionTypes from './actions'
import axios from '../../axios-order'

export const addIngredients = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredients = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients
    }
}

const fetchError = () => {
    return {
        type: actionTypes.FETCH_ERROR
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-burger-1382c.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))    
            })
            .catch(error => {
                dispatch(fetchError())
            })
    }
}