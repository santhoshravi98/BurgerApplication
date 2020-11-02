import React from 'react';
import SpinnerCss from '../Spinner/Spinner.module.css'
const Spinner = (props) => {
return (
    <div className={SpinnerCss.loader}>Loading...</div>
)
}
export default Spinner;