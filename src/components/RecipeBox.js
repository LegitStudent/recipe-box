import React from 'react';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import $ from 'jquery';

/* 
  Recipes will be stored as state. Firstly, state stored in localStorage is retrieved at componentDidMount lifecycle. In order to sync localStorage with the app's current state, the state will be stored to localStorage.
*/

class RecipeBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      recipes: [],
      recipeToUpdateIndex: -1
    }
    
    // Component Method Bindings
    this.getRecipeByIndex = this.getRecipeByIndex.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.showAddRecipeModal = this.showAddRecipeModal.bind(this);
  }
  
  // Component Lifecycle Methods
  
  componentDidMount() {
    const parsedRecipes = JSON.parse(localStorage.getItem("_app_state"));
    
    this.setState({ recipes: parsedRecipes })
  }
  
  componentDidUpdate() {
    localStorage.setItem("_app_state", JSON.stringify(this.state.recipes));
  }
  
  // Retrieve recipe details by its index in the recipe array
  getRecipeByIndex(recipeIndex) {
    return this.state.recipes[recipeIndex];
  }
  
  // Add a new recipe
  addRecipe(newRecipe) {
    this.setState({ recipes: this.state.recipes.concat(newRecipe) });
  }
  
  // Update a selected recipe
  updateRecipe(recipeIndex, newRecipe) {
    const newState = this.state.recipes.map((recipe, index) => {
      return (recipeIndex === index) ? newRecipe : recipe;
    });
    
    // Once this function is called, the queue for updating a recipe is cleared.
    
    this.setState({
      recipes: newState,
      recipeToUpdateIndex: -1
    });
  }
  
  // Removes a selected recipe
  removeRecipe(recipeIndex) {
    const newState = this.state.recipes.filter((recipe, i) => {
      return i !== recipeIndex;
    });
    
    this.setState({ recipes: newState });
  }
  
  queueRecipeUpdateIndex(index) {
    this.setState({ recipeToUpdateIndex: index });
    
  }
  
  showAddRecipeModal(e) {
    $('#recipe-modal').modal('show');
  }
  
  showUpdateRecipeModal(e) {
    $('#recipe-modal').modal('show');
  }
  
  render() {
    return (
      <div className="recipe-box">
        <h1 className="recipe-box__title">Recipe Box</h1>
        <RecipeList 
          recipes={ this.state.recipes }
          removeRecipe={ this.removeRecipe } />
        
        { /* TODO: Add edit button for each recipe */ }
        <button className="btn btn-default" onClick={ this.showAddRecipeModal }>
          Add Recipe
        </button>
        
        { /* Modals below: */ }
        
        <RecipeInput
          title={ this.props.recipe ? "New Recipe" : "Edit Recipe" }
          addRecipe={ this.addRecipe }
          getRecipe={ this.getRecipeByIndex }
          updateRecipe={ this.updateRecipe }
          recipeIndex={ this.recipeToUpdateIndex } />        
      </div>
    );
  }
}

export default RecipeBox;