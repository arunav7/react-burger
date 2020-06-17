import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //Since ingredients is an object and not an array so we need to convert it into array of keys
    //...Array(props.ingredients[igKey]) it will create new array of length equal to the value of the current key
    // props.ingredients[igKey] is simply props.ingredients.'igKey' but it is illegal that is why [igKey] is used
    // igKey is the individual element of Object.keys() method
    // '_' as a map argument implies that we are not concerned about the first argument
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // this will create an array of length of value of the given ingredient
            // if salad:2 then two arrays will be created each will contain salad
            // initially it will be empty as all ingredients are 0
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // if this is directly rendered withot the outer map then transformedIngredient will never be empty
                // as the component is not empty and here we are working with keys 
                // therefore each ingridient will be rendered once which is not required
                return <BurgerIngredient key={igKey + i} type={igKey} />
           })
        }).reduce((acc, el) => {
            return acc.concat(el)  // each element is concatenated into acc and then final value of acc is returned
        }, [])

    // Before reduce method transformedIngredients was an array of four different arrays
    // but by using reduce method four individual arrays got converted into elements in the transformedIngredients
    // This is called flattening of an array.

    console.log(transformedIngredients)
    
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
            {/* bread-top and bread-bottom is same for all burgers that is why it is hard-coded */}
        </div>
    )
}

export default burger