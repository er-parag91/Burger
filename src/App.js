import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Price from './components/Price/Price';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent (() => {
  return import ('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent (() => {
  return import ('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent (() => {
  return import ('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup ();
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/prices" component={Price} />
        <Route path="/Auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/prices" component={Price} />
          <Route path="/Auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState ()),
  };
};
export default withRouter (connect (mapStateToProps, mapDispatchToProps) (App));
