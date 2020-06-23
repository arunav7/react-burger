import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as Action from '../../../store/actions/index'

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout()
    }
    
    render() {
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(Action.authLogout())
})

export default connect(undefined, mapDispatchToProps)(Logout)