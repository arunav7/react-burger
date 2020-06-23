import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as Action from '../../store/actions/index'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                   type: 'email',
                   placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false  
            },
            password: {
                elementType: 'input',
                elementConfig: {
                   type: 'password',
                   placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false  
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath()
    }

    checkValidity(value, rules) {
        let isValid = true
        
        // for dropdown since it does not require any validation
        if(!rules)
            return true
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }
    
    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthHandler = () => {
        this.setState((prevState) => ({
            isSignUp: !prevState.isSignUp
        }))
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,                               // key = name, street ....
                config: this.state.controls[key]      // config = nested object of each key
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                isValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
        ))

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authJSX = (
            <div className='Auth'> 
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    btnType='Danger'
                    clicked={this.switchAuthHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )

        if(this.props.isAuthenticated) {
            authJSX = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <Fragment>
                {authJSX}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(Action.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(Action.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)