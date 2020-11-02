import React from 'react';
import BurgerCss from '../Burger/Burger.module.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients.js';
const Burger = (props) => {
    let sampleArray = [];
   let dynamicBurgerIngredients = Object.keys(props.ingredients)
   .map((iterator) => {
        sampleArray.push(props.ingredients[iterator]);
       return [...Array(props.ingredients[iterator])]
       .map((i,index) => {
           return <BurgerIngredients key={iterator+index} type={iterator}/>
       })
   });
   let hasNoIngredients = sampleArray.every(function(e){
       return e == 0;
   })
   if(hasNoIngredients)
   {
    dynamicBurgerIngredients = <p>Please enter a ingredient</p>
   }
   console.log(dynamicBurgerIngredients);
    return (
        <div className ={BurgerCss.Burger} >
            <BurgerIngredients type="BreadTop"/>
            {dynamicBurgerIngredients}
            <BurgerIngredients type="BreadBottom"/>
        </div>
    )
}
export default Burger;