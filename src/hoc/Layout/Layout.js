import React, { Component } from 'react';
import Ext from '../Ext/Ext';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect (mapStateToProps) (Layout);
