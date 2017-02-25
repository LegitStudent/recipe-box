import React from 'react';
import Recipe from './Recipe';

const RecipeList = (props) => {
  return (
    <ul className="recipe-list">
      { props.recipes.map((val, index) => {
          return (
            <Recipe key={ index } 
              index={ index }
              name={ val.recipeName } 
              ingredients={ val.ingredients } 
              removeRecipe={ props.removeRecipe }
              editRecipe={ props.editRecipe }
              />
          );
        }) }
    </ul>
  );
}

export default RecipeList;