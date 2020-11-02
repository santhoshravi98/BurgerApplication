import React, { Component } from 'react';
import Aux from '../../../HOC/AuxFolder/Aux.js';
import Button from '../../UI/Button/Button.js';
class OrderSummary extends Component {
    render(){
let orderSummaryDynamicDiv = Object.keys(this.props.ingredients).map((iterator) => {
    return (
        <li key={iterator}>
            <span> Ingredient Name: {iterator}, Ingredient Count: {this.props.ingredients[iterator]}</span>
        </li>
    )
})
    return(
        <Aux>
            <h2>Your Order Summary</h2>
            <div>
                <ul>
                {orderSummaryDynamicDiv}
                </ul>
            </div>
            <div>
                Total Amount = {this.props.totalPrice}
            </div>
            <div>
                Proceed to Checkout ?
            </div>
            <Button buttonClickMethod = {this.props.refToCloseModalFunction} buttonType="Danger">CANCEL ORDER </Button>
            <Button buttonClickMethod = {this.props.refToContinueCheckoutMethod} buttonType="Success">CONTINUE ORDER</Button>
        </Aux>
    )
    }
}
export default OrderSummary;