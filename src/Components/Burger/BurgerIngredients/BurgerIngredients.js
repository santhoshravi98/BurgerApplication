import React,{Component} from 'react';
import cssBurgerIngredients from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
class BurgerIngredients extends Component {
    render()
    {
let ingredient = null;
switch(this.props.type)
{
case 'BreadBottom':
    ingredient = <div className={cssBurgerIngredients.BreadBottom}>
    </div>
    break;
case 'BreadTop':
    ingredient = (
        <div className={cssBurgerIngredients.BreadTop}>
            <div className={cssBurgerIngredients.Seeds1}></div>
            <div className={cssBurgerIngredients.Seeds2}></div>
        </div>
    )
    break;
 case 'Meat':
     ingredient = <div className = {cssBurgerIngredients.Meat}>
     </div>       
     break;

case 'Cheese':
    ingredient = <div className = {cssBurgerIngredients.Cheese}></div>
    break;
case 'Salad':
    ingredient = <div className = {cssBurgerIngredients.Salad}></div>
    break;
case 'Bacon':
    ingredient = <div className = {cssBurgerIngredients.Bacon}></div>
    break;   
default:
        ingredient = null;     
}
return ingredient;
}
}
BurgerIngredients.propTypes = {
    type:PropTypes.string.isRequired
}
export default BurgerIngredients;