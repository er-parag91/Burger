import React, { Component } from 'react';
import Order from '../../components/Orders/Order';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
  state = {
    error: false,
  };
  componentDidMount () {
    this.props.onFetchorders (this.props.token, this.props.userId);
  }
  render () {
    let orders = <Spinner />;
    if (this.props.error) {
      orders = (
        <div
          style={{
            textAlign: 'center',
            border: '1px solid grey',
            width: '90%',
            margin: 'auto',
            boxShadow: '0 2px 3px black',
          }}>
          <h1>You are not signed in</h1>
          <p>Accessing placed order requires sign in</p>
        </div>
      );
    }
    if (!this.props.error) {
      orders = this.props.orders.map (order => (
        <Order
          key={order.id}
          name={order.name}
          Date={order.Date}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    error: state.order.error,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchorders: (token, userId) =>
      dispatch (actions.fetchOrders (token, userId)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Orders, axios);
