import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';

export default function CategoryButtons() {
  const { setFood, setDrink, search, setSearch } = useContext(MyContext);
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const [toggle, setToggle] = useState('');

  const fetchCategoryMeal = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(URL);
    const { meals } = await result.json();
    if (meals.length) history.push(/comidas/);
    setCategory(meals);
  };

  const fetchCategoryDrink = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(URL);
    const { drinks } = await result.json();
    if (drinks.length) history.push(/bebidas/);
    setCategory(drinks);
  };

  function chooseFood() {
    if (pathname === '/bebidas') {
      return fetchCategoryDrink();
    }
    return fetchCategoryMeal();
  }

  const categoryFilter = async (strCategory) => {
    if (pathname === '/bebidas') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`;
      console.log(URL);
      const response = await fetch(URL);
      const categories = await response.json();
      setDrink(categories.drinks);
    } else {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`;
      const response = await fetch(URL);
      const categories = await response.json();
      setFood(categories.meals);
    }
  };
  const allCategories = async () => {
    if (pathname === '/bebidas') {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const categories = await response.json();
      setDrink(categories.drinks);
    } else {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const categories = await response.json();
      setFood(categories.meals);
    }
  };

  function toggleCategory({ target }) {
    if (toggle === target.name) {
      setToggle('');
      setSearch(false);
    } else {
      setToggle(target.name);
      setSearch(false);
    }
  }

  useEffect(() => {
    fetchCategoryMeal();
    fetchCategoryDrink();
    chooseFood();
  }, []);

  useEffect(() => {
    if (!search) {
      if (toggle !== '') {
        categoryFilter(toggle);
      } else {
        allCategories();
      }
    }
  }, [toggle]);

  const maxList = 5;

  return (
    <div>
      <button
        id="btn-all"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => allCategories() }
      >
        All
      </button>
      {category.length > 0 && category.map(({ strCategory }, index) => (
        index < maxList && (
          <label htmlFor={ `${strCategory}${index}` } key={ index }>
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              name={ strCategory }
              onClick={ (e) => toggleCategory(e) }
            >
              { strCategory }
            </button>
          </label>
        )
      ))}
    </div>
  );
}
