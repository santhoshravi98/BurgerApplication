import React, { Component } from "react";
import { connect } from "react-redux";
import * as ActionCreator from "../../Store/Actions/Index";
class Logout extends Component {
    
  componentDidMount() {
    this.props.logOutUser();
    window.location = "/";
  }
  render() {
    return <div></div>;
  }
}

const mapdispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(ActionCreator.authLogout()),
  };
};

export default connect(null, mapdispatchToProps)(Logout);
