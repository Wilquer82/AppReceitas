import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import useExploreRecipes from '../Context/useExploreRecipes';

export default function ExploreFood() {
  const { backToExplore, redirectToSurpriseMe } = useExploreRecipes('meal');

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => backToExplore('ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-by-area"
        type="button"
        onClick={ () => backToExplore('area') }
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => redirectToSurpriseMe('comidas') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
