import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import MyContext from './MyContext';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../Services/FetchApi';

export default function useSearchbar() {
  const { setRecipe, recipe } = useContext(MyContext);
  const [searchResult, setSearchResult] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');

  const history = useHistory();
  const { pathname } = history.location;
  const recipeName = pathname === '/comidas' ? 'meals' : 'drinks';
  const food = recipe[recipeName];

  const getRecipe = () => {
    const site = pathname === '/comidas' ? 'meal' : 'cocktail';

    switch (selectedSearch) {
    case 'ingredient':
      return fetchIngredient(site, searchResult);
    case 'name':
      return fetchName(site, searchResult);
    case 'firstLetter':
      if (searchResult.length === 1) {
        return fetchFirstLetter(site, searchResult);
      }
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
      return { meals: [], drinks: [] };
    default:
      return { meals: [], drinks: [] };
    }
  };

  const getSearch = async () => {
    const recipeResult = await getRecipe();
    setRecipe(recipeResult);
  };

  const redirectByChoice = () => {
    const idFood = pathname === '/comidas' ? 'idMeal' : 'idDrink';

    if (food.length === 1 && food) {
      history.push(`${pathname}/${food[0][idFood]}`);
    }
  };

  if (food) redirectByChoice();

  if (!food) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return {
    setSelectedSearch,
    setSearchResult,
    redirectByChoice,
    getSearch,
    getRecipe,
  };
}
