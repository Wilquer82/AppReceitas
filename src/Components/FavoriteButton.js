import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MyContext from '../Context/MyContext';

function FavoriteBtn({ id, type, area, category, alcoholicOrNot, name, image, index }) {
  const {
    isFavorite, setIsFavorite,
  } = useContext(MyContext);
  // const [myLocalStorage, setmyLocalStorage] = useState([]);

  const recipeId = id;

  const setButton = () => {
    const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const checkLocalStr = Object.values(getLocalStr)
      .some(({ id: strId }) => strId === recipeId);

    setIsFavorite(checkLocalStr);
  };

  useEffect(() => {
    setButton();
  });

  const setUnfavorite = () => {
    setIsFavorite(!isFavorite);

    const recipeDetails = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };

    // console.log(recipeDetails);
    const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const checkLocalStr = Object.values(storageFavorites)
      .some(({ id: strId }) => strId === recipeId);

    if (checkLocalStr) {
      const getRecipeId = JSON.stringify(storageFavorites
        .filter((recipe) => recipe.id !== recipeId));
      localStorage.setItem('favoriteRecipes', getRecipeId);
      console.log(getRecipeId);
      setIsFavorite(false);
    } else {
      const myStructure = JSON.stringify([...storageFavorites, recipeDetails]);
      console.log(myStructure);
      localStorage.setItem('favoriteRecipes', myStructure);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ setUnfavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          alt="set favorite"
        />
      </button>
    </div>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoriteBtn;
