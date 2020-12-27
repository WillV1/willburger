import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from '../components/Search';
import RecipeList from '../pages/RecipeList';
import Spinner from '../layout/Spinner';

const Main = ({recipe: {recipes, loading}}) => {
  return (
    <div>
      <Search />
      {loading ? <Spinner /> : <RecipeList />}
    </div>
  )
}

Main.propTypes = {
  recipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
})

export default connect(mapStateToProps, { })(Main);