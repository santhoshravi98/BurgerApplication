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
    this.props.getOrders();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(ActionCreators.fetchOrders()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
