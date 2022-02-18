import React, { useEffect, useContext } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrink, getFood } from '../Services/FetchApi';
import MyContext from '../Context/MyContext';
import CardRecipes from './CardRecipes';
import './Recomended.css';

function RecomendedRecipes({ origem }) {
  const { cards, setCards } = useContext(MyContext);
  const busca = async () => {
    console.log(origem);
    if (origem.includes('comidas')) {
      const resposta = await getDrink();
      setCards(resposta.drinks);
    } else {
      const resposta = await getFood();
      setCards(resposta.meals);
    }
  };
  useEffect(() => {
    busca();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderCardRecipes = () => {
    const showMaxRecipes = 6;
    if (cards) {
      const filteredRecipe = cards.filter(
        (item, index) => index < showMaxRecipes,
      );
      return filteredRecipe;
    }
  };
  if (origem.includes('comidas')) {
    return (
      <div className="slider">
        {cards.length > 0 && renderCardRecipes().map((recp, index) => (
          <Link
            data-testid={ `${index}-recomendation-card` }
            className="recomendation-card"
            key={ index }
            to="/bebidas/details-recipe"
          >
            <CardRecipes
              key={ index }
              index={ index }
              thumb={ recp.strDrinkThumb }
              title={ recp.strDrink }
            />
          </Link>
        ))}
      </div>);
  }
  return (
    <div className="cardlist">
      {cards.length > 0 && renderCardRecipes().map((recp, index) => (
        <Link
          className="recomendation-card"
          data-testid={ `${index}-recomendation-card` }
          key={ index }
          to="/comidas/details-recipe"
        >
          <CardRecipes
            key={ index }
            index={ index }
            thumb={ recp.strMealThumb }
            title={ recp.strMeal }
          />
        </Link>
      ))}
    </div>);
}

RecomendedRecipes.propTypes = {
  origem: PropTypes.string.isRequired,
};

export default RecomendedRecipes;

RecomendedRecipes.propTypes = {
  origem: string,
}.isRequired;
