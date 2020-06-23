// This is the function for code splitting or lazy loading
// i.e components inside this file will be dynamicaly loaded when user visits the path and not before it

import React, {Component} from 'react'

const asyncComponent = (importComponent) => {
    return class extends Component {
        state= {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default })
                })
        }
        
        render() {
            const C = this.state.component
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent