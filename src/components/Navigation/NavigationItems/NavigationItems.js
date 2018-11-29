import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem clicked={props.clicked} link="/prices">
      Prices
    </NavigationItem>
    <NavigationItem clicked={props.clicked} exact link="/">
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated
      ? <NavigationItem clicked={props.clicked} link="/orders">
          Your orders
        </NavigationItem>
      : null}
    {props.isAuthenticated
      ? <NavigationItem clicked={props.clicked} link="/logout">
          Sign Out
        </NavigationItem>
      : <NavigationItem clicked={props.clicked} link="/Auth">
          Sign In
        </NavigationItem>}
  </ul>
);

export default navigationItems;
