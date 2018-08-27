import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys (
      this.props.ingredients
    ).map (igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
          :
          <span style={{ fontWeight: 'bold', color: 'green' }}>
            {this.props.ingredients[igKey]}
          </span>
        </li>
      );
    });

    return (
      <div>
        <h1>Your Order</h1>
        <p>A delicious burger with following ingredients added: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed (2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    );
  }
}
export default OrderSummary;
