import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Burger/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as Action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let order = this.props.orders === null 
            ? <p style={{fontFamily: 'inherit', textAlign: 'center'}}> Sorry you have no orders </p> 
            : <Spinner />
        if(!this.props.loading) {
            order = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}/>
            ))
        }
        return (
            <Fragment>
                {order}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(Action.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))