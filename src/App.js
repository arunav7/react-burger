import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout'
import * as Action from './store/actions/index'
import asyncComponent from './hoc/asyncComponent'

const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth')
})

const asyncOrders = asyncComponent(() => {
  return import('./container/Orders/Orders')
})

const asyncCheckout = asyncComponent(() => {
  return import('./container/Checkout/Checkout')
})


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()  // this will always load, so this is placed here
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/' component={BurgerBuilder} exact/>
        <Route path='/auth' component={asyncAuth} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' component={BurgerBuilder} exact/>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/logout' component={Logout} />
          <Route path='/orders' component={asyncOrders} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(Action.checkAuthState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
