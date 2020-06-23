import * as actionTypes from './actions'
import axios from '../../axios-order'

const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post(`/orders.json?auth=${token}`, orderData)                   // auth is query params
            .then(res => {
                console.log(res.data)
                dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            })
            .catch(err => {
                if(err)
                    dispatch(purchaseBurgerFail(err))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`/orders.json?${queryParams}`)      // only fetch orders when authenticated
            .then(res => {
                const fetchedOrders = []
                // key is the unique id generated by the firebase
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],   // this is the data for the particular id
                        id: key             // unique id generated by the firebase
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}