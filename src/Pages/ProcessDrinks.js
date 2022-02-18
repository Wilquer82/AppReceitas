import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';

export default function ProcessDrinks({ match: { params: { id } } }) {
  const [recipes, setRecipes] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [numberOfChecked, setNumberOfChecked] = useState(0);
  // Didmount - Faz fetch trazendo a receita pelo id e seta o stado recipes com as receita
  useEffect(() => {
    const getApi = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const results = await response.json();
      const drinks = results.drinks[0];
      setRecipes(drinks);
    };
    getApi();
  }, [id]);
  // retorna o array com os ingredientes
  const ingredientsRecipe = () => {
    const arrayIndredientKids = Object.keys(recipes)
      .filter((item) => item
        .includes('strIngredient'));
    const ingredients = [];
    arrayIndredientKids.forEach((key) => {
      if (recipes[key]) {
        ingredients.push(recipes[key]);
      }
    });
    return ingredients;
  };
  // retorna um array com as medidas de cada ingredientes
  const ingredientsMesure = () => {
    const arrayIndredientKids = Object.keys(recipes)
      .filter((item) => item
        .includes('strMeasure'));
    const ingredients2 = [];
    arrayIndredientKids.forEach((key) => {
      if (recipes[key]) {
        ingredients2.push(recipes[key]);
      }
    });
    return ingredients2;
  };
  // retorna a concatenação do retorno da função ingredientsMesure com ingredientsRecipe
  const concatIngredientWithMesure = () => {
    const newArray = [];
    for (let index = 0; index < ingredientsRecipe().length; index += 1) {
      newArray.push(`-${ingredientsRecipe()[index]} - ${ingredientsMesure()[index]}`);
    }
    return newArray;
  };

  function count(e) {
    if (e.target.checked === true) {
      setNumberOfChecked(numberOfChecked + 1);
    } else {
      setNumberOfChecked(numberOfChecked - 1);
    }
  }

  const handleChange = () => {
    const a = document.getElementsByClassName('count-checkboxes').length - 1;
    console.log(a, numberOfChecked);
    if (numberOfChecked === a) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div>
      <img
        id="img-recipe"
        src={ recipes.strDrinkThumb }
        data-testid="recipe-photo"
        alt="Imagem da receita"
      />
      <h2 data-testid="recipe-title">{ recipes.strDrink }</h2>
      <ShareButton idRecipe={ `bebidas/${recipes.idDrink}` } />
      <FavoriteButton
        id={ recipes.idDrink }
        type="bebida"
        area=""
        category="Cocktail"
        alcoholicOrNot={ recipes.strAlcoholic }
        name={ recipes.strDrink }
        image={ recipes.strDrinkThumb }
      />
      <h3 data-testid="recipe-category">{ recipes.strCategory }</h3>
      <h3>Ingredients</h3>
      { concatIngredientWithMesure()
        .map((igredient, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ igredient[index] }
          >
            <input
              type="checkbox"
              id={ igredient[index] }
              className="count-checkboxes"
              value={ igredient }
              onChange={ () => handleChange() }
              onClick={ (e) => count(e) }
            />
            {' '}
            { igredient }
          </label>)) }
      <h3 data-testid="instructions">Instructions</h3>
      <p>{recipes.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disabled }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

ProcessDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
