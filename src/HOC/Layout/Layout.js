import React, { Component } from 'react';
import Aux from '../AuxFolder/Auxillary.js'
import cssClasses from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar.js'
import SideDrawer from  '../../Components/Navigation/SideDrawer/SideDrawer.js'
//Check Comment
class Layout extends Component {
    state = ({
        showSideDrawer:false
    });
    closeSideDrawer = () => {
        this.setState({
            showSideDrawer:false
        })
    }
    ToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    };
    render(){
    return(
        <Aux>
        <Toolbar refToToggleSideDrawer={this.ToggleHandler}/>
        <SideDrawer showSideDrawer={this.state.showSideDrawer} refToCloseSideDrawer={this.closeSideDrawer}/>
        <main className={cssClasses.Content}>
            {this.props.children}
        </main>
        </Aux>
    )
}
}
export default Layout;  