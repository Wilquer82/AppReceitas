import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ idRecipe }) {
  const [isCopy, setIsCopy] = useState(false);

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
  };

  return (
    <>
      {isCopy ? <span>Link copiado!</span> : false}
      <button
        data-testid="share-btn"
        type="button"
        onClick={ (event) => copyToClipboard(event) }
      >
        <img src={ shareIcon } alt={ idRecipe } />
      </button>
    </>
  );
}

ShareButton.propTypes = {
  idRecipe: PropTypes.string,
}.isRequired;

export default ShareButton;
