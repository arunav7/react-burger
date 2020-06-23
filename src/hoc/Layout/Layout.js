import React from 'react'
import { connect } from 'react-redux'

import Aux from '../Auxiliary'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState(() => ({
            showSideDrawer: false
        }))
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                   isAuth={this.props.isAuthenticated} 
                   toggle={this.toggleSideDrawerHandler} />
                <SideDrawer 
                   isAuth={this.props.isAuthenticated} 
                   open={this.state.showSideDrawer}
                   closed={this.closeSideDrawerHandler} />
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}  

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);