import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardRecipes from '../Components/CardRecipes';

function ExploreFoodOrigin() {
  const [areas, setAreas] = useState([]);
  const [foods, setFoods] = useState([]);

  const showMaxRecipes = 12;
  const AllURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  async function AllBtn() {
    const response = await fetch(AllURL);
    const result = await response.json();
    setFoods(result.meals);
    return result;
  }

  async function areaRequest(e) {
    const area = e.target.value;
    let URL = '';
    console.log(area);
    if (e.target.value !== 'All') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      const request = await fetch(URL);
      const response = await request.json();
      setFoods(response.meals);
      return response;
    }
  }

  useEffect(() => {
    // busca os países.
    const getFoodsByArea = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const result = await response.json();
      setAreas(result.meals);
      return result;
    };
    getFoodsByArea();
    AllBtn();
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" searchIconAppears />

      <select onChange={ (e) => areaRequest(e) } data-testid="explore-by-area-dropdown">
        <option data-testid="All-option" onClick={ () => AllBtn() }>All</option>
        { areas.map(({ strArea }, index) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ `${strArea}${index}` }
          >
            {strArea}
          </option>
        )) }
      </select>

      <h3>Resultados</h3>
      {foods.length > 0 && foods.map(({ strMeal, strMealThumb, idMeal }, index) => (
        index < showMaxRecipes
          && (
            <Link
              className="link"
              key={ `${idMeal}` }
              to={ {
                pathname: `/comidas/${idMeal}`,
              } }
            >
              <CardRecipes
                data-testid={ `${index}-recipe-card` }
                key={ index }
                index={ index }
                thumb={ strMealThumb }
                title={ strMeal }
              />
            </Link>
          )
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodOrigin;
