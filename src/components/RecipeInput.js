import React from 'react';
import $ from 'jquery';
import IngredientInput from './IngredientInput';

/*  
  General React Input Component
    - Template for the NewRecipe and EditRecipe dialog boxes. The only difference between the two is the name. Functionality should be the same except for the submit button.
*/

class RecipeInput extends React.Component {
  constructor(props) {
    super(props); 
    // Stateful presentational component because new recipes change while being edited.
    this.state = {
      recipeName: "",
      recipeIngredients: [""]
    }
    
    // Component event handler bindings
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
  }
  
  addIngredient(e) {
    e.preventDefault();
    
    this.setState({
      recipeIngredients: this.state.recipeIngredients.concat("")
    });
  }
  
  componentWillReceiveProps(nextProps) {
    // Check if recipeId changed
    if (this.props.recipeIndex !== nextProps.recipeIndex) {
      const updateIndex = nextProps.recipeIndex;
      const recipeDetails = this.props.getRecipe(updateIndex);
      
      this.setState({
        recipeName: recipeDetails.name,
        recipeIngredients: recipeDetails.ingredients
      });
    }
  }
  
  deleteIngredient(index) {
    const newState = this.state.recipeIngredients
      .filter((ing, i) => {
        return i !== index;
      });
    
    this.setState({ recipeIngredients: newState });
  }
  
  handleChangeIngredient(index, value) {
    const newState = this.state.recipeIngredients.map((ing, i) => {
      if (i === index) {
        return value;
      }
      else {
        return ing;
      }
    });
    
    this.setState({
      recipeIngredients: newState
    });
  }
  
  handleChangeName(e) {
    this.setState({ recipeName: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // Format state vars to submittable object
    let recipeToSubmit = {
      recipeName: this.state.recipeName,
      ingredients: this.state.recipeIngredients
    }
    
    // Use submit handler in the props
    this.props.submitFunction(recipeToSubmit);
    
    // Hide the modal
    $("#recipe-modal").modal('hide');
    
    // Reset component state to initial values
    this.setState({
      recipeName: "",
      recipeIngredients: [""]
    });
  }
  
  render() {
    return (
      <form id="recipe-modal" className="recipe-input modal fade" onSubmit={ this.handleSubmit }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{ this.props.recipe ? "New Recipe" : "Edit Recipe" }</h2>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="name-field" htmlFor="recipe-name">Name: 
                  <input required id="recipe-name"
                    className="form-control"
                    autoComplete="off"
                    value={ this.state.recipeName }
                    type="text" 
                    onChange={ this.handleChangeName } />
                </label>
              </div>
              
              <div className="form-group">
                <label className="ingredients-field" htmlFor="recipe-ingredients">Ingredients:
                  {
                    this.state.recipeIngredients.map((ingredient, i) => {
                      return (
                        <IngredientInput 
                          key={i}
                          index={i}
                          ingredient={ ingredient }
                          changeIngredient={ this.handleChangeIngredient }
                          deleteIngredient={ this.deleteIngredient }
                          />
                      );
                    })
                  }
                </label>
              </div>
              
              <button
                className="add-ingredient btn btn-default"
                onClick={ this.addIngredient }>
                Add Ingredient
              </button>
            </div>
            
            <div className="modal-footer">            
              <input 
                className="submit-recipe btn btn-primary" 
                disabled={
                  this.state.recipeName === "" || 
                    this.state.recipeIngredients.join() === ""
                }
                type="submit" 
                onClick={ this.handleSubmit }/>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RecipeInput;