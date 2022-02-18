import React from 'react';
import { string, number } from 'prop-types';

export default function CardRecipes({ index, thumb, title }) {
  return (
    <section className={ `card${index}` } data-testid={ `${index}-recipe-card` }>
      <img
        className="foodimg"
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt="Receita"
      />
      <p data-testid={ `${index}-card-name` }>{title}</p>
    </section>
  );
}

CardRecipes.propTypes = {
  index: number,
  thumb: string,
  title: string,
  id: string,
}.isRequired;
