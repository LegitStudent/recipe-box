import React from 'react';

const IngredientsList = (props) => {
  const classList = "recipe__ingredients " + (props.collapsed ? "recipe__ingredients--collapsed" : "" )
  
  return (
    <ul className={ classList }>
      { props.ingredients.map((val, i) => {
        return(
          <li className="recipe__ingredient" key={i}> {val} </li>
        );
      }) }
    </ul>
  );
}

export default IngredientsList;