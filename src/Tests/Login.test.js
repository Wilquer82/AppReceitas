import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Login from '../Pages/Login';

describe('Testa a Página de Login', () => {
  it('Testa se a página de Login é renderizada na rota "/', () => {
    const { history } = renderWithRouter(<Login />);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Testa se aparecem os inputs na página', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login />);
    expect(getByPlaceholderText(/Digite seu email/)).toBeInTheDocument();
    expect(getByPlaceholderText(/Digite sua senha/)).toBeInTheDocument();
  });

  it('Testa se na tela de Login aparece um botão com o texto Entrar', () => {
    const { getByRole, getByText } = renderWithRouter(<Login />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText(/Entrar/i)).toBeInTheDocument();
  });

  it('Espera que ao clicar no botão redirecione à tela principal de receitas', () => {
    const { getByRole, history } = renderWithRouter(<Login />);
    const EnterButton = getByRole('button', { name: /Entrar/i });
    expect(EnterButton).toBeInTheDocument();

    fireEvent.click(EnterButton);
    const url = history.location.pathname;
    expect(url).toBe('/comidas');
  });
});
