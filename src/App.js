import React, { Component } from "react";
import Layout from "../src/HOC/Layout/Layout";
import BurgerBuilder from "../src/Containers/BurgerBuilder/BugerBuilder.js";
import Checkout from "../src/Containers/Checkout/Checkout.js";
import { Route, Switch } from "react-router-dom";
import MyOrders from "../src/Containers/MyOrders/MyOrders.js";
import Auth from "../src/Containers/Auth/Auth";
import Logout from "../src/Containers/Auth/Logout";
import * as AuthCreator from "../src/Store/Actions/Index";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.getAuthenticationInfoFromLocalStorageOrStore();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/myorders" component={MyOrders} />
          <Route path="/logout" exact component={Logout} />
         <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthenticationInfoFromLocalStorageOrStore: () =>
      dispatch(AuthCreator.getAuthenticationInfoFromLocalStorageOrStore()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.token !== null,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
