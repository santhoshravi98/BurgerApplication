import React from 'react';
import css from '../BuildControl/BuildControl.module.css';
const BuildControl = (props) => {
return (
    <div className = {css.BuildControl}>
        <div className={css.Label}>{props.Label}</div>
            <button className={css.Less} onClick = {props.refToRemoveMethodBind} disabled ={props.refToDisabledObject}>Less</button>
            <button className ={css.More} onClick ={props.refToAddMethodBind}>More</button>
    </div>
)
}
export default BuildControl;