import * as actionTypes from './actionTypes';
import axios from '../../axios-orders.js';

export const addIngredients = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get ('https://myburger-4d493.firebaseio.com/ingredients.json')
      .then (response => {
        dispatch (setIngredients (response.data));
      });
  };
};
