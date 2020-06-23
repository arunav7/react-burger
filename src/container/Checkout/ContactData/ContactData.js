import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import './ContactData.css'

import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-order'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as Action from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
          name: {
              elementType: 'input',
              elementConfig: {
                 type: 'text',
                 placeholder: 'Your Name'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false  // tracks whether user touched the feild of not
          },
          street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
          },
          postalCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6,
                isNumeric: true
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                   {value: 'fastest', displayValue: 'Fastest'},
                   {value: 'cheapest', displayValue: 'Cheapest'}
               ]
            },
            value: 'fastest',
            validation: {},
            valid: true
          }
        },
        isFormValid: false     // to check whether form is valid
    }

    orderHandler = (event) => {
        event.preventDefault()
        // console.log(this.props.ingredients)
        const formDataElements = {}
        for (let elements in this.state.orderForm) {                            // elements = name, street, email etc
            formDataElements[elements] = this.state.orderForm[elements].value
        }

        // formDataElements = {name: value, street: value ...} where value is binded from the DOM
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.userId,
            orderData: formDataElements             // passing the form details to server
        }
        this.props.onOrderBurger(order, this.props.token)
    }
    
    // inputIdentifier is just a key of orderForm i.e name, street, email etc.
    inputChangedHandler = (e, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        })
        const updatedForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
        
        let isFormValid = true
        for (const key in updatedForm) {
            isFormValid = updatedForm[key].valid && isFormValid
        }

        this.setState({ orderForm: updatedForm, isFormValid })
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,                               // key = name, street ....
                config: this.state.orderForm[key]      // config = nested object of each key
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        isValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.isFormValid}>Order</Button>
            </form>
        )

        if(this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className='ContactData'>
                <h4>Enter your details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(Action.purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))