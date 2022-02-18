import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import './Styles/ProcessFoods.css';
// import MyContext from '../Context/MyContext';

export default function ProcessFoods({ match: { params: { id } } }) {
  const [recipes, setRecipes] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [numberOfChecked, setNumberOfChecked] = useState(0);
  // const { ingredients, setIngredients } = useContext(MyContext);
  // const { inProgress, setInprogress } = useContext(MyContext);
  // const { checkedIngredients, setCheckIngredients } = useContext(MyContext);
  // const { allChecked, setAllChecked } = useContext(MyContext);

  // Didmount - Faz fetch trazendo a receita pelo id e seta o stado recipes com as receita
  useEffect(() => {
    const getApi = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const results = await response.json();
      const meals = results.meals[0];
      setRecipes(meals);
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

  // useEffect(() => {
  //   setTaskBtnsEnabled(numberOfChecked > 0);
  // }, [numberOfChecked]);
  console.log(numberOfChecked);
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
  // checa inputs checkbox
  // const checkedInputs = () => {
  //   if (setCheckIngredients === arrayRecipesFiltered.length) {
  //     return setAllChecked(true);
  //   }
  //   return setAllChecked(false);
  // };

  // useEffect(() => {
  //   updateLocalStorage();
  //   const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  //   localStorage.setItem('inProgressRecipes', JSON
  //     .stringify(storage));
  // }, []);
  // // Acrescenta
  // const handleClick = (event) => {
  //   if (event.target.checked === true) {
  //     setInprogress(inProgress + 1);
  //     return setIngredients([...ingredients, event.target.value]);
  //   }
  // };

  // const updateLocalStorage = () => {
  //   const newLocalStorage = {
  //     cocktails: allMealsStorage,
  //     meals: { ...otherStorageRecepies, [id]: [...ingredients] } };
  //   const newLocalStorageString = JSON.stringify(newLocalStorage);
  //   localStorage.setItem('inProgressRecipes', newLocalStorageString);

  //   const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  //   if (event.target.checked) {
  //     localStorage.setItem('inProgressRecipes', JSON
  //       .stringify([...storage, event.target.value]));
  //   } else {
  //     localStorage.setItem('inProgressRecipes', JSON
  //       .stringify(storage.filter((item) => item !== event.target.value)));
  //   }
  // };
  return (
    <div>
      <img
        id="img-recipe"
        src={ recipes.strMealThumb }
        data-testid="recipe-photo"
        alt="Imagem da receita"
      />
      <h2 data-testid="recipe-title">{ recipes.strMeal }</h2>
      <ShareButton idRecipe={ `comidas/${recipes.idMeal}` } />
      <FavoriteButton
        id={ recipes.idMeal }
        type="comida"
        area={ recipes.strArea }
        category={ recipes.strCategory }
        name={ recipes.strMeal }
        alcoholicOrNot=""
        image={ recipes.strMealThumb }
      />
      <h3 data-testid="recipe-category">{ recipes.strCategory }</h3>
      <h3>Ingredients</h3>
      <ul>
        { concatIngredientWithMesure()
          .map((igredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ igredient[index] }
            >
              <input
                className="count-checkboxes"
                type="checkbox"
                id={ igredient[index] }
                value={ igredient }
                onChange={ () => handleChange() }
                onClick={ (e) => count(e) }
                // checked="checked"
              />
              {' '}
              { igredient }
            </label>)) }
      </ul>
      <h3 data-testid="instructions">Instructions</h3>
      <p>{recipes.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          id="start-recipe-btn"
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

ProcessFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
