import React, { Component } from 'react';
import CheckOutSummary
  from '../../components/Orders/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack ();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace ('/checkout/contact-data');
  };
  render () {
    return (
      <div>
        <CheckOutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ings}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect (mapStateToProps) (Checkout);
