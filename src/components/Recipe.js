import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import IngredientsList from './IngredientsList';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: true
    }
    
    this.toggleIngredientList = this.toggleIngredientList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  /* View Methdods */

  toggleIngredientList(e) {
    // e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed })
  }

  /* Event-handlers */
  handleEdit(e) {
    this.props.editRecipe(this.props.index);
  }

  handleDelete(e) {
    this.props.removeRecipe(this.props.index);
  }
  

  render() {
    return (
      <li className="recipe">
        
        <header className="header">
          <h2 className="header__title name"
              onClick={ this.toggleIngredientList }>
              { this.props.name }
          </h2>

          {/*onClick=Edit recipe with recipe id */}
          <Button
            onClick={ this.handleEdit }>
            <Glyphicon glyph="pencil" />
          </Button>

          <Button
              bsStyle="danger"
              onClick={ this.handleDelete }>
            <Glyphicon glyph="trash" />
          </Button>
        </header>
        
        
        <IngredientsList 
          ingredients={ this.props.ingredients }
          collapsed={ this.state.collapsed }/>
      </li>
      );
  }
}

export default Recipe;