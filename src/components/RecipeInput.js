import React from 'react';
import { Button, Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

import IngredientInput from './IngredientInput';


class RecipeInput extends React.Component {
  constructor(props) {
    super(props); 

    // Stateful presentational component because new recipes change while being edited.
    this.state = {
      recipeName: "",
      recipeIngredients: [""]
    }
    
    /* Show modal property should be in the props now as this.props.show */

    // Component event handler bindings
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  
  addIngredient(e) {
    e.preventDefault();
    
    this.setState({
      recipeIngredients: this.state.recipeIngredients.concat("")
    });
  }
  
  componentWillReceiveProps(nextProps) {
    // Check if recipeId changed
    if (this.props !== nextProps) {
      const updateIndex = nextProps.recipeIndex;

      // Update Index is not -1 if an edit recipe operation was called. Otherwise, it will be a call for a new recipe.
      if (updateIndex > -1) {
        const recipeDetails = this.props.getRecipe(updateIndex);

        this.setState({
          recipeName: recipeDetails.recipeName,
          recipeIngredients: recipeDetails.ingredients
        });
      }
      else {
        this.setState({
          recipeName: "",
          recipeIngredients: [""]
        })
      }
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

  handleOpen(e) {
    this.props.open();
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // Format state vars to submittable object
    let recipeToSubmit = {
      recipeName: this.state.recipeName,
      ingredients: this.state.recipeIngredients
    }
    
    // Use submit handler in the props
    if (this.props.recipeIndex === -1) {
      this.props.addRecipe(recipeToSubmit);
    }
    else {
      this.props.updateRecipe(this.props.recipeIndex, recipeToSubmit);
    }
    
    // Hide the modal
    this.props.close();
    
    // Reset component state to initial values
    this.setState({
      recipeName: "",
      recipeIngredients: [""]
    });
  }
  
  render() {
    return (
      <div>
        <Button onClick={ this.handleOpen }>
          Add Recipe
        </Button>
      
        <Modal show={ this.props.show } onHide={ this.props.close }>
          <form id="recipe-modal" className="recipe-input" onSubmit={ this.handleSubmit }>
            <Modal.Header closeButton>
              <Modal.Title>{ (this.props.recipeIndex >= 0) ? "Edit Recipe" : "New Recipe" }</Modal.Title>
            </Modal.Header>
                
            <Modal.Body>
              <FormGroup controlId="recipe-name">
                <ControlLabel>Name: 
                  <FormControl required id="recipe-name"
                    autoComplete="off"
                    value={ this.state.recipeName }
                    type="text" 
                    onChange={ this.handleChangeName } />
                </ControlLabel>
              </FormGroup>
              
              <FormGroup controlId="recipe-ingredients">
                <ControlLabel htmlFor="recipe-ingredients">Ingredients:
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
                </ControlLabel>
              </FormGroup>
              
              <Button
                className="add-ingredient"
                onClick={ this.addIngredient }>
                Add Ingredient
              </Button>
            </Modal.Body>
                
            <Modal.Footer>            
              <Button 
                bsStyle="primary"
                className="submit-recipe" 
                disabled={
                  this.state.recipeName === "" || 
                    this.state.recipeIngredients.join() === ""
                }
                type="submit" >
                  Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default RecipeInput;