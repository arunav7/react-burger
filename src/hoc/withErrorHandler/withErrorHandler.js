import React, { Component } from 'react'
import Aux from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.resIntreceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        // this will remove the interceptors whenever the wrapped component is unmounted
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorHandler}>
                            { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    } 
}

export default withErrorHandler