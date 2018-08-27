import React, { Component } from 'react';
import Order from '../../components/Orders/Order';
import axios from '../../axios-orders';
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false,
  };
  componentDidMount () {
    const fetchedOrders = [];
    axios
      .get ('orders.json')
      .then (res => {
        for (let key in res.data) {
          fetchedOrders.push ({
            ...res.data[key],
            id: key,
          });
        }
        this.setState ({ loading: false, orders: fetchedOrders });
      })
      .catch (error => {
        this.setState ({ error: true });
      });
  }
  render () {
    return (
      <div>
        {this.state.orders.map (order => {
          return (
            <Order
              key={order.id}
              name={order.name}
              ingredients={order.ingredients}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default Orders;
