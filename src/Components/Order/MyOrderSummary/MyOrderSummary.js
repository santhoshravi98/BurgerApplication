import React from 'react'
import Css from '../MyOrderSummary/MyOrderSummary.module.css'
const MyOrderSummary = (props) => {
let dynamicDiv = Object.keys(props.info).map((e) => {
return <span key={e}>Name : {e}, Count of Ingredients : {props.info[e]} <br></br></span>
})
return(
    <div className={Css.Order}>
        <p>{dynamicDiv}</p>
<p>price:<strong>Rupees : {props.price}</strong></p>
    </div>
)
}
export default MyOrderSummary;