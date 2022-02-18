import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardRecipes from '../Components/CardRecipes';
import MyContext from '../Context/MyContext';
import CategoryButtons from '../Components/CategoryButtons';

export default function RecipesDrinks() {
  const { drink, setDrink } = useContext(MyContext);
  const showMaxRecipes = 12;

  const getDrink = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const json = await response.json();
    setDrink(json.drinks);
  };

  useEffect(() => {
    if (drink.length === 0) {
      getDrink();
    }
  }, []);

  return (
    <div>
      <Header className="title" title="Bebidas" searchIconAppears />
      <CategoryButtons />
      <div className="cardlist">
        {drink.length > 0 && drink.map((recp, index) => (
          index < showMaxRecipes
          && (
            <Link
              className="link"
              key={ recp.idDrink }
              to={ {
                pathname: `/bebidas/${recp.idDrink}`,
              } }
            >
              <CardRecipes
                key={ index }
                index={ index }
                thumb={ recp.strDrinkThumb }
                title={ recp.strDrink }
              />
            </Link>
          )
        ))}
      </div>
      <Footer />
    </div>
  );
}
