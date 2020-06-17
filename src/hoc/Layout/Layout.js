import React from 'react'
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
                   toggle={this.toggleSideDrawerHandler} />
                <SideDrawer 
                   open={this.state.showSideDrawer}
                   closed={this.closeSideDrawerHandler} />
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}  

export default Layout;