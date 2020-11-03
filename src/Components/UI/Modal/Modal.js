import React, { Component } from 'react'
import ModalCss from '../../UI/Modal/Modal.module.css';
import Backdrop from '../Backdrop/Backdrop.js';
import Aux from '../../../HOC/AuxFolder/Auxillary.js'
class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState)
    {
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
    }
    componentDidUpdate(){
        console.log("Model Component Updated");
    }
    render()
    {
    let cssNames = ModalCss.Modal;
    let styleForModal = {};
    if(this.props.showModal)
    {
        styleForModal = {
            transition: 'translateY(0)',
            opacity: '1'
        }
    }
    else
    {
        styleForModal = {
            transition: 'translateY(-100vh)',
            opacity: '0',
            display:'none'
        }
    }
        return (
            <Aux>
                <Backdrop showBackdrop = {this.props.showModal} refToCloseModalFunction = {this.props.refToCloseModalFunction}></Backdrop>
            <div className = {cssNames}
            style = {styleForModal}
            >
            {this.props.children}
            </div>
            </Aux>
        )
    }
}
export default Modal;