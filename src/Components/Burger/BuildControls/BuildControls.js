import React from 'react';
import css from '../BuildControls/BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl.js';
import {connect} from 'react-redux'
const BuildControls = (props) => {
    let data = [
        {label:'Meat',type:'Meat'},
        {label:'Cheese',type:'Cheese'},
        {label:'Salad',type:'Salad'},
        {label:'Bacon',type:'Bacon'}
    ]
return (
    <div className = {css.BuildControls}>
        <div>Total price = {props.totalPrice}</div>
        {data.map((ite) => {
            return <BuildControl
             key ={ite.label}
              Label ={ite.label}
               refToAddMethodBind ={ () => {props.refToAddMethod(ite.type)}}
               refToRemoveMethodBind = { () => {props.refToRemoveMethod(ite.type)}}
               refToDisabledObject = {props.refToDisabledObject[ite.type]}
               />
        })}
        <button className={css.OrderButton} disabled={props.refToDisableOrderButton}
        onClick = {() => {props.refTosetShowModalOnOrderButtonClick()}}> {props.isAuthenticated ? 'ORDER NOW' : 'Sign Up/Login To Order'}</button>
    </div>
)
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.AuthReducer.token !== null
    }
}
export default connect(mapStateToProps)(BuildControls);