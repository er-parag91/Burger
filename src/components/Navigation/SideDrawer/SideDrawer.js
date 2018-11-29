import React from 'react';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Ext from '../../../hoc/Ext/Ext';

const sideDrawer = props => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Ext>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClass.join (' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems
          isAuthenticated={props.isAuth}
          clicked={props.closed}
        />
      </div>
    </Ext>
  );
};
export default sideDrawer;
