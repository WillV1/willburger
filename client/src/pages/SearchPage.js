import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipes } from '../actions/recipe';
import RecipeItem from '../components/RecipeItem';
import Spinner from '../layout/Spinner';

const SearchPage = ({getRecipes, recipe:{recipes, loading}}) => {

  const [state, setState] = useState({
    ingredient: '',
    query: '',
    page: ''
  });

  const {  ingredient, query, page } = state;

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();



    setState({
      ingredient: '',
      query: '',
      page: ''
    })
  };



  return (
    <div>
    <div class="row">
    <form class="col s12" onSubmit={e => onSubmit(e)}>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" />
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" />
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" />
          <label for="email">Email</label>
        </div>
      </div>
    </form>
  </div>
  {recipes.map(recipe => {
    <RecipeItem />
  })}
  </div>
  )
}

SearchPage.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
})

export default connect(mapStateToProps, { getRecipes })(SearchPage);