import PropTypes from 'prop-types';

export default function veriryrecipeisdone({ match: { params: { id } } }) {
  // const [recipes, setRecipes] = useState([]);
  function veriryrecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneRecipes.length > 0) {
      return doneRecipes.some((recipe) => recipe.id === id);
    }
    return false;
  }

  return [veriryrecipe];
}

veriryrecipeisdone.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
