import React, { Component } from 'react';

import Ext from '../../hoc/Ext/Ext';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class burgerBuilder extends Component {
  state = {
    purchable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount () {
    axios
      .get ('https://myburger-4d493.firebaseio.com/ingredients.json')
      .then (response => this.setState ({ ingredients: response.data }));
  }
  updatePurchasing (ingredients) {
    const sum = Object.keys (ingredients)
      .map (igKey => {
        return ingredients[igKey];
      })
      .reduce ((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseCancelledHandler = () => {
    this.setState ({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push ('/checkout');
  };

  purchaseHandler = () => {
    this.setState ({ purchasing: true });
  };
  render () {
    let disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Ext>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchable={!this.updatePurchasing (this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Ext>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelledHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Ext>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Ext>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: igName =>
      dispatch ({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
    onIngredientRemoved: igName =>
      dispatch ({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName,
      }),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (burgerBuilder);
