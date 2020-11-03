import React, { Component } from "react";
import MyOrderSummary from "../../Components/Order/MyOrderSummary/MyOrderSummary";
import Axios from "../../Axios-order";
class MyOrders extends Component {
  state = {
    ingFromDb: [],
    apiError: false,
    loadingModal: true,
  };
  componentDidMount() {
    Axios.get("orders.json")
      .then((response) => {
        let ingArray = [];
        for(let i in response.data)
        {
          ingArray.push(
          response.data[i]
          );
        }
        console.log(ingArray);
        this.setState({
          ingFromDb : ingArray,
          loadingModal: false,
          apiError: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingModal: false,
          apiError: true,
        });
      });
  }

  render() {
const dynamicDiv = this.state.ingFromDb.map((e) => {
  return <MyOrderSummary key={e.price} info={e.ingredients} price={e.price}/>
});
   
    return (
     <div>
  {dynamicDiv}
     </div>
 )
}
}
export default MyOrders;
