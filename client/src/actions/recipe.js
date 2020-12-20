import axios from 'axios';
import { GET_RECIPES, RECIPE_ERROR } from './types';

export const getRecipes = (ingredient, query, page) => async dispatch => {
  try {
    const response = await axios.get(`http://www.recipepuppy.com/api/?i=${ingredient}&q=${query}&p=${page}`);

    dispatch({
      type: GET_RECIPES,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}