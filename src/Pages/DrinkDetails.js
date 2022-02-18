import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import checkInProgress from '../Services/checkInProgress';
import RecomendedRecipes from '../Components/RecomendedRecipes';
import veriryrecipeisdone from '../Services/veriryrecipeisdone';
import './Styles/detailsrecipe.css';

function DrinkDetails({ match: { params: { id } }, location: { pathname } }) {
  const [recipes, setRecipes] = useState([]);
  const { veriryrecipe } = veriryrecipeisdone;

  // Didmount - Faz fetch trazendo a receita pelo id e seta o stado recipes com as receita
  useEffect(() => {
    const getApi = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const results = await response.json();
      const drink = results.drinks[0];
      setRecipes(drink);
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
    const arrayIngredientKeys = Object.keys(recipes)
      .filter((item) => item
        .includes('strMeasure'));
    const ingredients2 = [];
    arrayIngredientKeys.forEach((key) => {
      if (recipes[key]) {
        ingredients2.push(recipes[key]);
      }
    });
    return ingredients2;
  };

  // retorna a concatenação do retorno da função ingredientsMesure com ingredientsRecipe
  const concatIngredientWithMesure = () => {
    const newArray = [];
    for (let index = 0; index <= ingredientsRecipe().length; index += 1) {
      newArray.push(`-${ingredientsRecipe()[index]} - ${ingredientsMesure()[index]}`);
    }
    return newArray;
  };
  const essaPagina = pathname;

  checkInProgress();
  const checkStart = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress && Object.keys(inProgress.cocktails)
      .find((key) => key === recipes.idDrink)) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  };

  // function verifyrecipeisdone() {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   if (doneRecipes.length > 0) {
  //     return doneRecipes.some((recipe) => recipe.id === id);
  //   }
  //   return false;
  // }

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
      <h3 data-testid="recipe-category">
        {recipes.strCategory && recipes.strAlcoholic}
      </h3>
      <h3>Ingredients</h3>
      <ul>
        { concatIngredientWithMesure()
          .map((igredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {igredient}
            </li>)) }
      </ul>
      <h3 data-testid="instructions">{recipes.strInstructions}</h3>
      <br />
      <h4>Recomendations:</h4>
      <div id="recommended"><RecomendedRecipes origem={ essaPagina } /></div>
      <div>
        <Link to={ `/bebidas/${recipes.idDrink}/in-progress` } params={ recipes.idDrink }>
          <Button
            className="start-recipe-btn"
            type="button"
            style={ { display: veriryrecipe ? 'none' : 'initial' } }
            data-testid="start-recipe-btn"
          >
            { checkStart() }
          </Button>
        </Link>
      </div>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
