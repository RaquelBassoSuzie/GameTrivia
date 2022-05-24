import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Verifica o comportamento da aplicação ao realizar o Login', () => {
  it('avalia a renderização do componente App com store próprio', () => {
    const { debug } = renderWithRouterAndRedux(<App />, {}, '/');


    const img = screen.getByRole('img', { name: /logo/i });
    expect(img).toBeInTheDocument();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    expect(button).toBeDisabled();

    userEvent.type(nameInput, '');
    userEvent.type(emailInput, 'meu-email@teste.com');
    expect(button).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email-errado-teste.com');
    expect(button).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    expect(button).toBeEnabled();

    
  });
  
  
});