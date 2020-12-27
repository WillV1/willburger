import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchRecipes } from '../actions/recipe';
import RecipeItem from '../components/RecipeItem';

const Search = ({searchRecipes, recipe:{recipes, loading}}) => {

  const [state, setState] = useState({
    ingredient: '',
    query: '',
    page: ''
  });

  const { ingredient, query, page } = state;

  // useEffect(() => {
  //   searchRecipes();
  // }, [searchRecipes]);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    searchRecipes({ingredient, query, page});


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
        <div class="input-field col s12">
          <input id="ingredient" type="text" 
          name="ingredient" value={ingredient}
          onChange={e => onChange(e)}
          class="validate" />
          <label for="ingredient">Ingredients</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="query" type="text" class="validate" 
          onChange={e => onChange(e)}
          name="query" value={query}
          />
          <label for="query">Food Query</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="page" type="number" class="validate" 
          onChange={e => onChange(e)}
          name="page" value={page}
          />
          <label for="page">Search Page</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
  {recipes.map((recipe, index) => {
    return <RecipeItem key={index} recipe={recipe}/>
  })}
  </div>
  )
}

Search.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
})

export default connect(mapStateToProps, { searchRecipes })(Search);