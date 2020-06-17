import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
            value: '',
            validation: {},
            valid: true
          }
        },
        loading: false,
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

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formDataElements             // passing the form details to server
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(err => {
                if(err)
                    this.setState({loading: false})
            })
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

    // inputIdentifier is just a key of orderForm i.e name, street, email etc.
    inputChangedHandler = (e, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedForm[inputIdentifier] = updatedFormElement
        
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

        if(this.state.loading) {
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
    ingredients: state.ingredients,
    price: state.price
})

export default connect(mapStateToProps)(ContactData)