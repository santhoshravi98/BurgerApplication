import React, { Component } from "react";
import MyOrderSummary from "../../Components/Order/MyOrderSummary/MyOrderSummary";
import * as ActionCreators from "../../Store/Actions/Index";
import { connect } from "react-redux";
class MyOrders extends Component {
  state = {
    ingFromDb: [],
    apiError: false,
    loadingModal: true,
  };
  componentDidMount() {
    if(this.props.token)
    this.props.getOrders(this.props.token,this.props.userToken);
  }

  render() {
    let dynamicDiv = null;
    if (this.props.ingFromDb) {
      dynamicDiv = this.props.ingFromDb.map((e) => {
        return (
          <MyOrderSummary key={e.price} info={e.ingredients} price={e.price} />
        );
      });
    }
    return <div>{dynamicDiv}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingFromDb: state.OrderReducer.orders,
    token:state.AuthReducer.token,
    userToken:state.AuthReducer.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (token,userToken) => dispatch(ActionCreators.fetchOrders(token,userToken)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
