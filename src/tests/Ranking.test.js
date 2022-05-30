import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

describe('Verifica o comportamento da aplicação na página de Ranking', () => {
  const name1 = 'Nome 1';
  const name2 = 'Nome 2';
  const name3 = 'Nome 3';

  const correctOrder = [name1, name3, name2];

  it('avalia a renderização dos elementos da página de Ranking', () => {
    const INICIAL_STATE_1 = {
      player: {
        name: 'Meu Nome',
        gravatarEmail: 'meu-email@teste.com',
        score: 0,
        assertions: 0,
      },
      game: {
        questions, 
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INICIAL_STATE_1, '/ranking');
    
    const titleRanking = screen.getByTestId("ranking-title");
    expect(titleRanking).toBeInTheDocument();

    const buttonGoHome = screen.getByTestId("btn-go-home");
    expect(buttonGoHome).toBeInTheDocument();
    userEvent.click(buttonGoHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Implementação do primeiro game', async () => {

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));
    
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    // Game 1 - Pontuação máxima
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, name1);
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    expect(fetchMock).toBeCalled();

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    questions.results.forEach(() => {
      userEvent.click(screen.getByTestId("correct-answer"));
      userEvent.click(screen.getByTestId("btn-next"));
    });

    const storage = localStorage.getItem('ranking');
    expect(JSON.parse(storage)).toHaveLength(1);

    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    userEvent.click(buttonPlayAgain);
    
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Implementação do segundo game', async () => {

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));
    
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    // Game 2 - Pontuação nula
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, name2);
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    expect(fetchMock).toBeCalled();

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    questions.results.forEach(() => {
      userEvent.click(screen.getByTestId('wrong-answer-0'));
      userEvent.click(screen.getByTestId("btn-next"));
    });

    const storage = localStorage.getItem('ranking');
    expect(JSON.parse(storage)).toHaveLength(2);

    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    userEvent.click(buttonPlayAgain);
    
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Implementação do terceiro game e renderização dos ranking ordenandos corretamente', async () => {

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));
    
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    // Game 3 - Pontuação mediana
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, name3);
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    expect(fetchMock).toBeCalled();

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    // Pergunta 1
    userEvent.click(screen.getByTestId("correct-answer"));
    userEvent.click(screen.getByTestId("btn-next"));
    // Pergunta 2
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId("btn-next"));
    // Pergunta 3
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId("btn-next"));
    // Pergunta 4
    userEvent.click(screen.getByTestId("correct-answer"));
    userEvent.click(screen.getByTestId("btn-next"));
    // Pergunta 5
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId("btn-next"));

    const storage = localStorage.getItem('ranking');
    expect(JSON.parse(storage)).toHaveLength(3);

    const buttonRanking = screen.getByTestId("btn-ranking");
    userEvent.click(buttonRanking);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');

    correctOrder.forEach((name, index) => {
      const nameElement = screen.getByTestId(`player-name-${index}`);
      expect(nameElement.innerHTML).toBe(name);
    });
  });
});
