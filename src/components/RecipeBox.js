import React from 'react';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';

/* 
  Recipes will be stored as state. Firstly, state stored in localStorage is retrieved at componentDidMount lifecycle. In order to sync localStorage with the app's current state, the state will be stored to localStorage.
*/

class RecipeBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      recipes: [],
      recipeToUpdateIndex: -1,
      showInputModal: false
    }
    
    // Component Method Bindings
    this.getRecipeByIndex = this.getRecipeByIndex.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }
  
  /*  Component Lifecycle Methods */
  
  // Gets the recipes from localStorage and mounts to application.
  componentDidMount() {
    const parsedRecipes = JSON.parse(localStorage.getItem("_app_state"));
    
    this.setState({ recipes: parsedRecipes })
  }
  
  // Updates localStorage to reflect current app state.
  componentDidUpdate() {
    localStorage.setItem("_app_state", JSON.stringify(this.state.recipes));
  }
  
  /* CRUD Methods */

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

  /* View Methods */

  openModal(updateIndex = -1) {
    this.setState({
      showInputModal: true,
      recipeToUpdateIndex: updateIndex
    });    
  }

  closeModal() {
    this.setState({ 
      showInputModal: false
    });
  }

  editRecipe(index) {
    this.openModal(index);
  }

  render() {
    return (
      <div className="recipe-box">
        <h1 className="recipe-box__title">Recipe Box</h1>
        <RecipeList 
          recipes={ this.state.recipes }
          removeRecipe={ this.removeRecipe } 
          editRecipe={ this.editRecipe }/>
        
        <RecipeInput
          addRecipe={ this.addRecipe }
          getRecipe={ this.getRecipeByIndex }
          editRecipe={ this.editRecipe }
          recipeIndex={ this.state.recipeToUpdateIndex } 
          updateRecipe={ this.updateRecipe }
          show={ this.state.showInputModal }
          open={ this.openModal }
          close={ this.closeModal }/>        
      </div>
    );
  }
}

export default RecipeBox;