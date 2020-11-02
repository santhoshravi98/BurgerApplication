import React from 'react';
import BackdropCss from '../Backdrop/Backdrop.module.css';
const backdrop = (props) => {
    let backdropDiv = null;
    if(props.showBackdrop)
    {
        backdropDiv = (
            <div className={BackdropCss.Backdrop} onClick = {props.refToCloseModalFunction}
            >
            </div>
        )
    }
    return (
        backdropDiv
    )
}
export default backdrop;