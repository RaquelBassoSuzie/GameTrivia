import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verifica o comportamento da aplicação na página de Feedback', () => {
  it('avalia a renderização do componente Feedback', () => {

    renderWithRouterAndRedux(<App />, {}, '/');
  });
});
