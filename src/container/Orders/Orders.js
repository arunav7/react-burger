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
        this.props.onFetchOrders()
    }

    render() {
        let order = <Spinner />
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
    loading: state.order.loading
})

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(Action.fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))