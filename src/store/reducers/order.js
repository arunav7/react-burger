import * as actionTypes from '../actions/actions'
import * as orderUtils from './orderUtility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


export default function(state=initialState, action) {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return orderUtils.purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START:
            return orderUtils.purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return orderUtils.purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return orderUtils.purchaseBurgerFail(state)
        case actionTypes.FETCH_ORDERS_START:
            return orderUtils.fetchOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return orderUtils.fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return orderUtils.fetchOrdersFail(state)
        default:
            return state
    }
}