import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/RecipeBox';
// import './index.css';

// If app is opened for the first time or if all keys are cleared, populate localStorage with initial values, otherwise the appState is always the localStorage

if (!localStorage.getItem('visited')) {
  localStorage.setItem("visited", "true");
  
  localStorage.setItem("_app_state", JSON.stringify([{
      recipeName: "Water the Meal",
      ingredients: ["1 cup water"]
    }, {
      recipeName: "Overnight Chai Oatmeal",
      ingredients: ["1 cup oats", "1 cup almond-coconut milk", "2 tablespoons chia seeds", "2 tablespoons shredded coconut", "1/4 teaspoon ground cardamom", "1/4 teaspoon ground cinnamon", "1/4 teaspoon vanilla extract", "1/4 teaspoon ground ginger", "1/4 teaspoon nutmeg"]
    }]));
}

ReactDOM.render(
  <RecipeBox />,
  document.getElementById('root')
);
