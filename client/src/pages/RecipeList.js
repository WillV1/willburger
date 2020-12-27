import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeItem from '../components/RecipeItem'

const RecipeList = ({recipe: { recipes, loading }, auth}) => {

  let listing;

  listing = recipes.length > 0 ? recipes.map((recipe,index) => {
    return <RecipeItem key={index} recipe={recipe} />}) : null;
  return (
    <div>
      {listing}
    </div>
  )
}

RecipeList.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
})

export default connect(mapStateToProps, {})(RecipeList);