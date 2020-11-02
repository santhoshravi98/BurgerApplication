import React,{Component} from 'react';
import Layout from '../src/HOC/Layout/Layout'
import BurgerBuilder from '../src/Containers/BurgerBuilder/BugerBuilder.js'
import Checkout from '../src/Containers/Checkout/Checkout.js'
import {Route} from 'react-router-dom'
import MyOrders from '../src/Containers/MyOrders/MyOrders.js'

class App extends Component {
  render()  {
  return (
    <Layout>
      <Route path="/checkout"  component={Checkout}/>
      <Route path="/myorders" component={MyOrders}/>
      <Route path="/" exact component={BurgerBuilder}/>
    </Layout>
  );
}
}
export default App;