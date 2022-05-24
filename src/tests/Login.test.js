import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Verifica o comportamento da aplicação ao realizar o Login', () => {
  it('avalia a renderização do componente Login', () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    // Requisito 1
    const img = screen.getByRole('img', { name: /logo/i });
    expect(img).toBeInTheDocument();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    expect(buttonPlay).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email-errado-teste.com');
    expect(buttonPlay).toBeDisabled();

    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    expect(buttonPlay).toBeEnabled();
  });

  it('avalia a requisição da api e o armazenamento no localStorage', () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    // Requisito 2
    const buttonPlay = screen.getByTestId('btn-play');

  });

  it('avalia a navegação para a página Setting', () => {
    const { debug, history } = renderWithRouterAndRedux(<App />, {}, '/');

    // Requisito 3
    const buttonSetting = screen.getByTestId('btn-settings');
    userEvent.click(buttonSetting);

    const settingTitle = screen.getByTestId('settings-title');
    expect(settingTitle).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');

  });

  
});