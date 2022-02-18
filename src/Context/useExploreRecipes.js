import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchSurprise } from '../Services/FetchApi';
import mealOrDrink from '../Services/MealOrDrink';

export default function useExploreRecipes(type) {
  const { push, location } = useHistory();
  const [id, setId] = useState(0);

  const { idFood, routeName, site, foods } = mealOrDrink(type);

  const backToExplore = (typeBack) => {
    push(`${location.pathname}/${typeBack}`);
  };

  const redirectToSurpriseMe = () => push(`/${routeName}/${id}`);

  useEffect(() => {
    const fetchDidMount = async () => {
      const response = await fetchSurprise(site);
      const idResponse = response[foods][0][idFood];
      setId(idResponse);
    };
    fetchDidMount();
  }, [foods, idFood, site, routeName]);

  return { backToExplore, redirectToSurpriseMe };
}
