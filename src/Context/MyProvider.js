import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [recipe, setRecipe] = useState({ meals: [], drinks: [] });
  const [inProgress, setInProgress] = useState([]);
  const { ingredients, setIngredients } = useState([]);
  const { checkedIngredients, setCheckIngredients } = useState([]);
  const { allChecked, setAllChecked } = useState([]);

  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [search, setSearch] = useState([]);
  const [recFood, setRecFood] = useState([]);
  const [recDrink, setRecDrink] = useState([]);
  const [cards, setCards] = useState([]);
  const [favoriteRecipes, setFavRecipes] = useState(() => {
    const favRecipe = localStorage.getItem('favoriteRecipes');
    return favRecipe ? JSON.parse(favRecipe) : [];
  });
  const [recomendations, setRecomendations] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const context = {
    allChecked,
    setAllChecked,
    checkedIngredients,
    setCheckIngredients,
    ingredients,
    setIngredients,
    recipe,
    setRecipe,
    inProgress,
    setInProgress,
    recFood,
    setRecFood,
    recDrink,
    setRecDrink,
    cards,
    setCards,
    favoriteRecipes,
    setFavRecipes,
    recomendations,
    setRecomendations,
    setIsFavorite,
    isFavorite,
    food,
    setFood,
    drink,
    setDrink,
    search,
    setSearch,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
