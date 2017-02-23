import React from 'react';
import IngredientsList from './IngredientsList';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: true
    }
    
    this.toggleIngredientList = this.toggleIngredientList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  toggleIngredientList(e) {
    e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed })
  }
  
  handleDelete(e) {
    this.props.removeRecipe(this.props.index);
  }
  
  render() {
    return (
      <li className="recipe">
        <a href="#" className="header"
           onClick={ this.toggleIngredientList } >
          <h2 className="name">{ this.props.name }</h2>
        </a>
        
        <IngredientsList 
          ingredients={ this.props.ingredients }
          collapsed={ this.state.collapsed }/>
        
        <button className="awesome delete-recipe-button"
          onClick={ this.handleDelete } >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </li>
      );
  }
}

export default Recipe;