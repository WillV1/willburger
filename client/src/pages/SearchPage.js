import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipes } from '../actions/recipe';
import Spinner from '../layout/Spinner';

const SearchPage = ({getRecipes, recipe:{recipes, loading}}) => {
  return (
    <div>
    
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