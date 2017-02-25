import React from 'react';
import { Button, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

const IngredientInput = (props) => {
  const handleChange = (e) => {
    props.changeIngredient(props.index, e.target.value);
  }
  
  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteIngredient(props.index);
  }
  
  return (
    <InputGroup>
      <FormControl 
      className="ingredient form-control" 
        required
        type="text" 
        value={ props.ingredient }
        onChange={ handleChange }
        />

        <InputGroup.Button>
          <Button 
            
            onClick={ handleDelete } >
              <Glyphicon glyph="minus" />
          </Button>
        </InputGroup.Button>
    </InputGroup>
  );
}

export default IngredientInput;