import React, { Component } from 'react';
import Ext from '../Ext/Ext';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState ({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState (prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render () {
    return (
      <Ext>
        <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          drawerToggleClicked={this.sideDrawerOpenHandler}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Ext>
    );
  }
}
export default Layout;
