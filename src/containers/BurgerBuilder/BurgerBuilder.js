import React, { Component } from 'react';

import Ext from '../../hoc/Ext/Ext';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class burgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount () {
    this.props.onInitIngredients ();
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
    this.props.onInitPurchase ();
    this.props.history.push ('/checkout');
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState ({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath ('/checkout');
      this.props.history.push ('/auth');
    }
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
            isAuth={this.props.isAuthenticated}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: igName => dispatch (actions.addIngredients (igName)),
    onIngredientRemoved: igName => dispatch (actions.removeIngredient (igName)),
    onInitIngredients: () => dispatch (actions.initIngredients ()),
    onInitPurchase: () => dispatch (actions.purchaseInit ()),
    onSetAuthRedirectPath: path =>
      dispatch (actions.setAuthRedirectPath (path)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (burgerBuilder);
