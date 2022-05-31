import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

const token = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "7dc183f87c5f2704465b0e14e2f1657c2afdb6b4336b760fcd5ba0ba2428223c",
};

const tokenInvalid = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "7dc183f87c5f2704465b0e14e2f1657c2afdb6b4336b760fcd5ba0ba2428223c",
};

const questionsWiyhTokenInvalid = { response_code: 3, results: [] };

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

describe('Verifica o comportamento da aplicação na página de Feedback', () => {
  it('avalia a renderização do componente Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

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

    const arrayDataTestIdsQuestionCard = [
      "question-text",
      "question-category",
      "answer-options",
      "correct-answer",
      'wrong-answer-0',
      'wrong-answer-1',
      'wrong-answer-2',
    ];

    arrayDataTestIdsQuestionCard.forEach((dataTestId) => {
      const infoElement = screen.getByTestId(dataTestId);
      expect(infoElement).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("correct-answer"));
    expect(screen.getByTestId("btn-next")).toBeInTheDocument();
  });

  it('avalia o comportamento do pior jogo possível', async () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    // Aplicação do spyOn baseado no exemplo presente na página do Benjamin Johnson
    // Com a aplicação de dois fetch seguidos com .mockImplementationOnce
    // link: https://benjaminjohnson.me/mocking-fetch
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));

    expect(fetchMock).toBeCalled();
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    questions.results.forEach(() => {
      const questionElement = screen.getByTestId("question-text");
      expect(questionElement).toBeInTheDocument();
      // console.log(questionElement.innerHTML);
      const correctAnswerElement = screen.getByTestId("correct-answer");
      const incorrectAnswerElement0 = screen.getByTestId('wrong-answer-0');
      const incorrectAnswerElement1 = screen.getByTestId('wrong-answer-1');
      const incorrectAnswerElement2 = screen.getByTestId('wrong-answer-2');
      expect(incorrectAnswerElement0).toBeInTheDocument();
      expect(incorrectAnswerElement1).toBeInTheDocument();
      expect(incorrectAnswerElement2).toBeInTheDocument();
      userEvent.click(incorrectAnswerElement0);
      const nextButton = screen.getByTestId("btn-next");
      userEvent.click(nextButton);
    });

    const message = screen.getByTestId("feedback-text");
    expect(message.innerHTML).toBe('Could be better...');
  });

  it('avalia o comportamento do jogo perfeito', async () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    // Aplicação do spyOn baseado no exemplo presente na página do Benjamin Johnson
    // Com a aplicação de dois fetch seguidos com .mockImplementationOnce
    // link: https://benjaminjohnson.me/mocking-fetch
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));

    expect(fetchMock).toBeCalled();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    questions.results.forEach(() => {
      const questionElement = screen.getByTestId("question-text");
      expect(questionElement).toBeInTheDocument();
      // console.log(questionElement.innerHTML);
      const correctAnswerElement = screen.getByTestId("correct-answer");
      const incorrectAnswerElement0 = screen.getByTestId('wrong-answer-0');
      const incorrectAnswerElement1 = screen.getByTestId('wrong-answer-1');
      const incorrectAnswerElement2 = screen.getByTestId('wrong-answer-2');
      expect(incorrectAnswerElement0).toBeInTheDocument();
      expect(incorrectAnswerElement1).toBeInTheDocument();
      expect(incorrectAnswerElement2).toBeInTheDocument();
      userEvent.click(correctAnswerElement);
      const nextButton = screen.getByTestId("btn-next");
      userEvent.click(nextButton);
    });

    const message = screen.getByTestId("feedback-text");
    expect(message.innerHTML).toBe('Well Done!');
  });

  it('avalia o comportamento temporizador', async () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    // Aplicação do spyOn baseado no exemplo presente na página do Benjamin Johnson
    // Com a aplicação de dois fetch seguidos com .mockImplementationOnce
    // link: https://benjaminjohnson.me/mocking-fetch
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questions) }));

    // Aplicação do Timer Mock proveniente da documentação
    // link: https://jestjs.io/docs/timer-mocks
    jest.useFakeTimers();
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    expect(fetchMock).toBeCalled();
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));
    
    expect(setTimeoutMock).toBeCalledTimes(1);
    const correctAnswerElement = screen.getByTestId("correct-answer");
    const incorrectAnswerElement0 = screen.getByTestId('wrong-answer-0');
    const incorrectAnswerElement1 = screen.getByTestId('wrong-answer-1');
    const incorrectAnswerElement2 = screen.getByTestId('wrong-answer-2');
 
    expect(correctAnswerElement).not.toBeDisabled();
    expect(incorrectAnswerElement0).not.toBeDisabled();
    expect(incorrectAnswerElement1).not.toBeDisabled();
    expect(incorrectAnswerElement2).not.toBeDisabled();

    jest.advanceTimersByTime(32000);

    expect(correctAnswerElement).toBeDisabled();
    expect(incorrectAnswerElement0).toBeDisabled();
    expect(incorrectAnswerElement1).toBeDisabled();
    expect(incorrectAnswerElement2).toBeDisabled();
  });

  it('avalia o comportamento da aplicação com um token inválido', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(tokenInvalid) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(questionsWiyhTokenInvalid) }));

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    
  });
});