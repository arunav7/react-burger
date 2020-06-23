import {updateObject} from '../../shared/utility'

export const purchaseInit = (state) => {
    return updateObject(state, { purchased: false })
}

export const purchaseBurgerStart = (state) => {
    return updateObject(state, { loading: true })
}

export const purchaseBurgerSuccess = (state, action) => {
    const updatedState = {
        loading: false,
        purchased: true,
        orders: state.orders.concat({
            ...action.orderData,
            id: action.orderId
        })
    }
    return updateObject(state, updatedState)
}

export const purchaseBurgerFail = (state) => {
    return updateObject(state, { loading: false })
}

export const fetchOrdersStart = (state) => {
    return updateObject(state, { loading: true })
}

export const fetchOrdersFail = (state) => {
    return updateObject(state, { loading: false })
}

export const fetchOrdersSuccess = (state, action) => {
    const updatedState = {
        orders: action.orders,
        loading: false
    }
    return updateObject(state, updatedState)
}
