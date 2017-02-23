import React from 'react';

const IngredientInput = (props) => {
  const handleChange = (e) => {
    props.changeIngredient(props.index, e.target.value);
  }
  
  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteIngredient(props.index);
  }
  
  return (
    <div className="ingredient-input input-group">
      <input className="ingredient form-control" 
        required
        type="text" 
        value={ props.ingredient }
        onChange={ handleChange }
        />
      <div className="input-group-addon">
        <button 
          className="awesome delete-ingredient"
          onClick={ handleDelete } >
          <i className="fa fa-minus-square" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default IngredientInput;