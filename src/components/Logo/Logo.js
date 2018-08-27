import React from 'react';
import burgerLogo from '../../assets/image/burger-logo.png';
import classes from './Logo.css';
const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="Burger21" />
  </div>
);

export default logo;
