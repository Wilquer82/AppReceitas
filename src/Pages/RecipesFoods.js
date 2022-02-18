import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardRecipes from '../Components/CardRecipes';
import './Styles/RecipesFoods.css';
import MyContext from '../Context/MyContext';
import CategoryButtons from '../Components/CategoryButtons';

export default function RecipesFoods() {
  const { food, setFood } = useContext(MyContext);
  const showMaxRecipes = 12;

  const getFood = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const json = await response.json();
    setFood(json.meals);
  };

  useEffect(() => {
    if (food.length === 0) {
      getFood();
    }
  }, []);

  return (
    <div>
      <Header className="title" title="Comidas" searchIconAppears />
      <CategoryButtons />
      <div className="cardlist">
        {food.length > 0 && food.map((recp, index) => (
          index < showMaxRecipes
          && (
            <Link
              className="link"
              key={ recp.idMeal }
              to={ {
                pathname: `/comidas/${recp.idMeal}`,
              } }
            >
              <CardRecipes
                key={ index }
                index={ index }
                thumb={ recp.strMealThumb }
                title={ recp.strMeal }
              />
            </Link>
          )
        ))}
      </div>
      <Footer />
    </div>
  );
}
