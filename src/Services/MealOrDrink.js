const mealOrDrink = (food) => {
  const foods = food.concat('s');
  const site = food === 'drink' ? 'cocktail' : 'meal';
  const idFood = food === 'drink' ? 'idDrink' : 'idMeal';
  const routeName = food === 'drink' ? 'bebidas' : 'comidas';
  return {
    foods,
    site,
    idFood,
    routeName,
  };
};

export default mealOrDrink;
