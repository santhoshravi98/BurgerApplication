import React, { Component } from 'react'
import Aux from '../../HOC/AuxFolder/Auxillary.js'
import Burger from '../../Components/Burger/Burger.js';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls.js';
import Modal from '../../Components/UI/Modal/Modal.js';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary.js';
import Axios from '../../Axios-order'
import LoadingModal from '../../Components/UI/Spinner/Spinner'
const PRICES = {
    Cheese :10,
    Bacon:20,
    Salad:30,
    Meat :40
}
class BurgerBuilder extends Component
{
    state = {
        ingredientsState : null,
        totalPrice : 50,
        disableOrderButton : true,
        showModal : false,
        showLoadingModal : false,
        apiError : false
    }
    componentDidMount() {
        Axios.get("ing.json").then(response => {
            this.setState({
                ingredientsState : response.data
            })
        }).catch(error => {
                this.setState({
                    showLoadingModal : false,
                    apiError : true
                });
        })
    }
    addIngredientHandler = (type) => {
        const oldTypeCount = this.state.ingredientsState[type];
        const updatedTypeCount = oldTypeCount + 1;
        const newIngredientsState = {...this.state.ingredientsState};
        newIngredientsState[type] = updatedTypeCount;
        const newPrice = this.state.totalPrice +  PRICES[type];
        this.setState({
            ingredientsState:newIngredientsState,
            totalPrice:newPrice
        });
        this.updateShouldDisableOrderButton(newIngredientsState);
    }
    removeIngredientHandler = (type) =>{
        const oldTypeCount = this.state.ingredientsState[type];
        if(oldTypeCount <= 0)
        {
            return;
        }
        const updatedTypeCount = oldTypeCount - 1;
        const newIngredientsState = {...this.state.ingredientsState};
        newIngredientsState[type] = updatedTypeCount;
        const newPrice = this.state.totalPrice -  PRICES[type];
        this.setState({
            ingredientsState:newIngredientsState,
            totalPrice:newPrice
        });
        this.updateShouldDisableOrderButton(newIngredientsState);
    }
    updateShouldDisableOrderButton = (newIngredientsState) => {
        const ingredientsArray = Object.keys(newIngredientsState).map((ite) => {
            return newIngredientsState[ite];
        });
        let ingredientsCount = 0;
        let i;
        for(i in ingredientsArray)
        {
            ingredientsCount+=ingredientsArray[i];
        }
        console.log("count" + ingredientsCount);
        let disableOrderButtonBool = (ingredientsCount === 0) ? true: false;
        this.setState({
            disableOrderButton :  disableOrderButtonBool
        })
    }

    setShowModalOnOrderButtonClick = () => {
        this.setState({
            showModal : true
        })
    }

    hideModalOnBackdropClick= () => {
        this.setState({
            showModal:false
        })
    }
    continueToCheckoutMethod = () => {
        // this.setState({
        //     showLoadingModal : true
        // });
        // let postData = {
        //     ingredients : this.state.ingredientsState,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:"santhosh",
        //         age:"17",
        //         address:"sample address - SANTHOSH"
        //     }
        // }
        // Axios.post("/orders.json",postData).then(response => {
        //     this.setState({
        //         showLoadingModal:false,
        //         showModal:false
        //     })
        //     console.log(response);
        //     console.log("Data posted sucesfully to google firebase - by santhosh");
        // }).catch(error => {
        //     this.setState({
        //         showLoadingModal:false,
        //         showModal:true,
        //         apiError : true
        //     })
        //     console.log(error);
        //     console.log("Data post error");
        // });
        let queryParams = [];
        for(let i in this.state.ingredientsState)
        {
            queryParams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredientsState[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search:'?'+queryParams.join('&'),
        });
    }
render()
{
    let DataForDisableLessButton = null;
    let newDataForDisableLessButton = null;
    if(this.state.ingredientsState)
    {
        DataForDisableLessButton = {...this.state.ingredientsState};
        newDataForDisableLessButton = {...this.state.ingredientsState};
  Object.keys(DataForDisableLessButton).map((ite) => {
      return (
        newDataForDisableLessButton[ite] = DataForDisableLessButton[ite] <= 0
      )
  })
  
  console.log("type of" + typeof newDataForDisableLessButton +"disabled data :type" + newDataForDisableLessButton);
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
if(this.state.ingredientsState){
    contentInsideModalDiv = (
    <OrderSummary ingredients = {this.state.ingredientsState}
    refToCloseModalFunction = {this.hideModalOnBackdropClick}
    refToContinueCheckoutMethod = {this.continueToCheckoutMethod}
   totalPrice={this.state.totalPrice}
    /> )
    }
    else
    {
        contentInsideModalDiv = (<div>initially null</div>) 
    }
if(this.state.showLoadingModal)
{
    contentInsideModalDiv = (<LoadingModal/>)
}
let contentDiv;
if(this.state.ingredientsState)
{
contentDiv = (
    <Aux>
    <Burger ingredients = {this.state.ingredientsState}/>
    <BuildControls 
    totalPrice = {this.state.totalPrice}
    refToAddMethod = {this.addIngredientHandler}
    refToRemoveMethod = {this.removeIngredientHandler}
    refToDisabledObject= {newDataForDisableLessButton}
    refToDisableOrderButton = {this.state.disableOrderButton}
    refTosetShowModalOnOrderButtonClick = {this.setShowModalOnOrderButtonClick}
    />
    </Aux>
)
}
else
contentDiv = <LoadingModal/>

if(this.state.apiError)
{
    contentInsideModalDiv = (<div>Api Error</div>);
    contentDiv = (<div>Api Error</div>);
}

    return(
        <Aux>
            <Modal showModal = {this.state.showModal} refToCloseModalFunction = {this.hideModalOnBackdropClick}>
              {contentInsideModalDiv}
             </Modal>
           {contentDiv}
        </Aux>
    )
}
}
export default BurgerBuilder;