import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneShareButton({ index, idRecipe }) {
  const [isCopy, setIsCopy] = useState(false);

  const copyToClipboard = (recipe) => {
    setIsCopy(true);
    const path = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(path);
  };

  return (
    <>
      {isCopy ? <span>Link copiado!</span> : false}
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
        onClick={ (event) => copyToClipboard(event) }
      >
        <img src={ shareIcon } alt={ idRecipe } />
      </button>
    </>
  );
}

DoneShareButton.propTypes = {
  idRecipe: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default DoneShareButton;
