import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Price from './components/Price/Price';
class App extends Component {
  render () {
    return (
      <div className="App">

        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/prices" component={Price} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
