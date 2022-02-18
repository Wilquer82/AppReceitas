import React from 'react';
import { fireEvent } from '@testing-library/react';
import Header from '../Components/Header';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Header', () => {
  it('Testa se o Header possui um Link que redireciona para a Página de Perfil', () => {
    const { getByRole, history } = renderWithRouter(<Header />);
    const link = getByRole('link');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/perfil');
  });

  it('Testa se a imagem do Link possui ID e ALT corretos', () => {
    const { getAllByRole } = renderWithRouter(<Header />);
    const image = getAllByRole('img');
    expect(image[0].alt).toContain('Icone de perfil');
    expect(image[0].src).toContain('profileIcon');
  });

  it('Testa se o Header possui um h1 dinâmico', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Header />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    const id = getByTestId('page-title');
    expect(id).toBeInTheDocument();
  });
});
