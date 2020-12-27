import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RecipeItem = ({recipe: { title, href, thumbnail }, auth}) => {
  return (
    <div>
      <img src={thumbnail} alt={title} />
      <h5>{title}</h5>
      <a href={href}>{title}</a>
    </div>
  )
}

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(RecipeItem);