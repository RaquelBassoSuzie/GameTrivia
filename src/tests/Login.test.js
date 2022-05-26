import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Verifica o comportamento da aplicação ao realizar o Login', () => {
  it('avalia a renderização do componente Login', () => {
    renderWithRouterAndRedux(<App />, {}, '/');

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

  it('avalia a requisição da api e o armazenamento no localStorage', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />, {});

    const token = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "7dc183f87c5f2704465b0e14e2f1657c2afdb6b4336b760fcd5ba0ba2428223c",
    };

    const questions = {
      response_code: 0,
      results:[
        {
          category: "Animals",
          type: "multiple",
          difficulty: "hard",
          question: "What is the scientific name of the Budgerigar?",
          correct_answer: "Melopsittacus undulatus",
          incorrect_answers: ["Nymphicus hollandicus", "Pyrrhura molinae", "Ara macao"]
        },
        {
          category: "Entertainment: Music",
          type: "multiple",
          difficulty: "medium",
          question: "Which French duo had UK hits in 1998 with the songs &#039;Sexy Boy&#039;, &#039;Kelly Watch The Stars&#039; &amp; &#039;All I Need&#039;?",
          correct_answer: "Air",
          incorrect_answers: ["Fire", "Earth", "Water"]
        },
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "medium",
          question: "What is the name of the first level in &quot;Call of Duty: World at War&quot;?",
          correct_answer: "Semper Fi",
          incorrect_answers: ["Ring of Steel", "Vendetta", "Eviction"]
        },
        {
          category: "Geography",
          type: "multiple",
          difficulty: "hard",
          question: "Bir Tawil, an uninhabited track of land claimed by no country, is located along the border of which two countries?",
          correct_answer: "Egypt and Sudan",
          incorrect_answers: ["Israel and Jordan", "Chad and Libya", "Iraq and Saudi Arabia"]
        },
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question: "Which of 2 Valve Games are set in the same universe?",
          correct_answer: "Half-life and Portal",
          incorrect_answers: ["Portal and Left 4 Dead", "Half-life and Left 4 Dead", "Half-life and Counter Strike"]
        },
      ]
    };

    // Aplicação do spyOn baseado no exemplo presente na página do Benjamin Johnson
    // Com a aplicação de dois fetch seguidos com .mockImplementationOnce
    // link: https://benjaminjohnson.me/mocking-fetch
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    expect(fetchMock).toBeCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    expect(fetchMock).toBeCalledTimes(2);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/game');

    const localStorageItem = localStorage.getItem('token');
    expect(localStorageItem).toBe(token.token);

    const { 
      category, 
      question, 
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions.results[0];
    const questionsInfo = [category, question, correctAnswer, ...incorrectAnswers];

    questionsInfo.forEach((info) => {
      const infoElement = screen.getByText(info);
      expect(infoElement).toBeInTheDocument();
    })

  });

  it('avalia a navegação para a página Setting', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    const buttonSetting = screen.getByTestId('btn-settings');
    userEvent.click(buttonSetting);

    const settingTitle = screen.getByTestId('settings-title');
    expect(settingTitle).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });
});
