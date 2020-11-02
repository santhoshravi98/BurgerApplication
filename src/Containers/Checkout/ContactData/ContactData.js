import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Css from "../ContactData/ContactData.module.css";
import Axios from "../../../Axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner.js";
import { withRouter } from "react-router";    
import Input from '../../../Components/UI/Input/Input'    

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
    showLoadingModal: false,
  };
  buttonClickedHandler = (event) => {
    event.preventDefault();
    this.setState({
      showLoadingModal: true,
    });
    if(this.props.totalPrice.length === 0 )
    {
        this.setState({
            showLoadingModal: false,
        });
    return;
    }
    let postData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "KIRAN POLLARD",
        age: "17",
        address: "sample address - POLLARD",
      },
    };
    Axios.post("/orders.json", postData)
      .then((response) => {
        this.setState({
          showLoadingModal: false,
        });
        console.log(response);
        console.log("Data posted sucesfully to google firebase - by santhosh");
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({
          showLoadingModal: false,
        });
        console.log(error);
        console.log("Data post error");
      });
  };
  render() {
    let dynamicDiv = null;
    if (!this.state.showLoadingModal) {
      dynamicDiv = (
        <form>
          <Input
           inputtype="input"
            type="text"
            name="name"
            placeholder="Enter name"
          />
          <Input
          inputtype="input"
            type="email"
            name="name"
            placeholder="Enter email"
          />
          <Input
          inputtype="input"
            type="text"
            name="name"
            placeholder="Enter address"
          />
          <Button
            buttonType="Success"
            buttonClickMethod={this.buttonClickedHandler}
          >
            ORDER THE BURGER
          </Button>
        </form>
      );
    } else dynamicDiv = <Spinner />;
    return <div className={Css.ContactData}>{dynamicDiv}</div>;
  }
}
export default withRouter(ContactData);
