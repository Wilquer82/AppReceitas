import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import useExploreRecipes from '../Context/useExploreRecipes';

export default function ExploreDrinks() {
  const { backToExplore, redirectToSurpriseMe } = useExploreRecipes('drink');

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => backToExplore('ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => redirectToSurpriseMe('bebidas') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
