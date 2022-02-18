import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Explore() {
  const { push } = useHistory();
  const redirectPageTo = (type) => push(`/explorar/${type}`);

  return (
    <div>
      <Header title="Explorar" />
      <button
        onClick={ () => redirectPageTo('comidas') }
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        onClick={ () => redirectPageTo('bebidas') }
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}
