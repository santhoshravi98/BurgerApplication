import React, { Component } from "react";
import Aux from "../../HOC/AuxFolder/Auxillary.js";
import { connect } from "react-redux";
import Burger from "../../Components/Burger/Burger.js";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls.js";
import Modal from "../../Components/UI/Modal/Modal.js";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary.js";
import * as BurgerActionCreator from "../../Store/Actions/Index";
import LoadingModal from "../../Components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    disableOrderButton: true,
    showModal: false,
    showLoadingModal: false,
  };
  componentDidMount() {
    this.props.initialiseIng();
  }

  updateShouldDisableOrderButton = (newIngredientsState) => {
    if (newIngredientsState !== null) {
      const ingredientsArray = Object.keys(newIngredientsState).map((ite) => {
        return newIngredientsState[ite];
      });
      let ingredientsCount = 0;
      let i;
      for (i in ingredientsArray) {
        ingredientsCount += ingredientsArray[i];
      }
      console.log("count" + ingredientsCount);
      let disableOrderButtonBool = ingredientsCount === 0 ? true : false;
      return disableOrderButtonBool;
    } else return true;
  };

  setShowModalOnOrderButtonClick = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/auth");
    } else {
      this.setState({
        showModal: true,
      });
    }
  };

  hideModalOnBackdropClick = () => {
    this.setState({
      showModal: false,
    });
  };
  continueToCheckoutMethod = () => {
    this.props.history.push("/checkout");
  };
  render() {
    let DataForDisableLessButton = null;
    let newDataForDisableLessButton = null;
    if (this.props.ing) {
      DataForDisableLessButton = { ...this.props.ing };
      newDataForDisableLessButton = { ...this.props.ing };
      Object.keys(DataForDisableLessButton).map((ite) => {
        return (newDataForDisableLessButton[ite] =
          DataForDisableLessButton[ite] <= 0);
      });

      console.log(
        "type of" +
          typeof newDataForDisableLessButton +
          "disabled data :type" +
          newDataForDisableLessButton
      );
    }
    //one can also use this basic for loop traversal
    //   for(obj in DataForDisableLessButton)
    //   {
    //       if(DataForDisableLessButton[obj] <= 0)
    //       DataForDisableLessButton[obj] = false;
    //       else
    //       DataForDisableLessButton[obj] = true;
    //   }
    let contentInsideModalDiv;
    if (this.props.ing) {
      contentInsideModalDiv = (
        <OrderSummary
          ingredients={this.props.ing}
          refToCloseModalFunction={this.hideModalOnBackdropClick}
          refToContinueCheckoutMethod={this.continueToCheckoutMethod}
          totalPrice={this.props.price}
        />
      );
    } else {
      contentInsideModalDiv = <div>initially null</div>;
    }
    if (this.state.showLoadingModal) {
      contentInsideModalDiv = <LoadingModal />;
    }
    let contentDiv;
    let enableOrDisableOrderButton = this.updateShouldDisableOrderButton(
      this.props.ing
    );
    if (this.props.ing) {
      contentDiv = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            totalPrice={this.props.price}
            refToAddMethod={this.props.addIng}
            refToRemoveMethod={this.props.removeIng}
            refToDisabledObject={newDataForDisableLessButton}
            refToDisableOrderButton={enableOrDisableOrderButton}
            refTosetShowModalOnOrderButtonClick={
              this.setShowModalOnOrderButtonClick
            }
          />
        </Aux>
      );
    } else contentDiv = <LoadingModal />;

    if (this.props.apiError) {
      contentInsideModalDiv = <div>Api Error</div>;
      contentDiv = <div>Api Error</div>;
    }

    return (
      <Aux>
        <Modal
          showModal={this.state.showModal}
          refToCloseModalFunction={this.hideModalOnBackdropClick}
        >
          {contentInsideModalDiv}
        </Modal>
        {contentDiv}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.BurgerBuilderReducer.ingredientsState,
    price: state.BurgerBuilderReducer.totalPrice,
    apiError: state.BurgerBuilderReducer.apiError,
    isAuthenticated: state.AuthReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIng: (ingName) => dispatch(BurgerActionCreator.addIngredient(ingName)),
    removeIng: (ingName) =>
      dispatch(BurgerActionCreator.removeIngredient(ingName)),
    initialiseIng: () => dispatch(BurgerActionCreator.initIngredients()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
