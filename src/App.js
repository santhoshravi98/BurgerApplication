import React,{Component} from 'react';
import Layout from '../src/HOC/Layout/Layout'
import BurgerBuilder from '../src/Containers/BurgerBuilder/BugerBuilder.js'
import Checkout from '../src/Containers/Checkout/Checkout.js'
import {Route} from 'react-router-dom'
import MyOrders from '../src/Containers/MyOrders/MyOrders.js'
import Auth from '../src/Containers/Auth/Auth'
import Logout from '../src/Containers/Auth/Logout'

class App extends Component {
  render()  {
  return (
    <Layout>
      <Route path="/checkout"  component={Checkout}/>
      <Route path="/myorders" component={MyOrders}/>
      <Route path="/auth" exact component={Auth}/>
      <Route path="/logout" exact component={Logout}/>
      <Route path="/" exact component={BurgerBuilder}/>
    </Layout>
  );
}
}
export default App;