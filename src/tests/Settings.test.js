import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

const categories = {
  "trivia_categories": [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ],
};

const token = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "7dc183f87c5f2704465b0e14e2f1657c2afdb6b4336b760fcd5ba0ba2428223c",
};

const fetchQuestionsSucess = {
  response_code:0,
  results:[
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "easy",
      question: "Which is NOT a book in the Harry Potter Series?",
      correct_answer: "The House Elf",
      incorrect_answers: ["The Chamber of Secrets", "The Prisoner of Azkaban", "The Deathly Hallows"],
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "easy",
      question: "What was the name of Captain Nemo&#039;s submarine in &quot;20,000 Leagues Under the Sea&quot;?",
      correct_answer: "The Nautilus",
      incorrect_answers: ["The Neptune", "The Poseidon  ", "The Atlantis"],
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "easy",
      question: "Which famous spy novelist wrote the childrens&#039; story &quot;Chitty-Chitty-Bang-Bang&quot;?",
      correct_answer: "Ian Fleming",
      incorrect_answers: ["Joseph Conrad", "John Buchan", "Graham Greene"],
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "easy",
      question: "How many Harry Potter books are there?",
      correct_answer: "7",
      incorrect_answers: ["8", "5", "6"],
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "easy",
      question: "What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?",
      correct_answer: "A Study in Scarlet",
      incorrect_answers: ["The Sign of the Four", "A Case of Identity", "The Doings of Raffles Haw"],
    }
  ],
};

const fetchQuestionsFailed = { response_code: 1, results: [] };

const filterQuestionsAPI = {
  response_code: 0,
  results: [
    {
      category: "Geography",
      type: "boolean",
      difficulty: "easy",
      question: "Greenland is almost as big as Africa.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Geography",
      type: "boolean",
      difficulty: "easy",
      question: "Toronto is the capital city of the North American country of Canada.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Geography",
      type: "boolean",
      difficulty: "easy",
      question: "Hungary is the only country in the world beginning with H.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Geography",
      type: "boolean",
      difficulty: "easy",
      question: "Nova Scotia is on the east coast of Canada.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "Geography",
      type: "boolean",
      difficulty: "easy",
      question: "Rhode Island is actually located on the US mainland, despite its name.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
  ],
};

describe('Verifica o comportamento da aplicação na página de Settings', () => {
  it('avalia a renderização do componente Settings', async () => {
    renderWithRouterAndRedux(<App />, {}, '/');
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(categories) }));
    
    const buttonSettings = screen.getByTestId("btn-settings");
    userEvent.click(buttonSettings);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(fetchMock).toBeCalledTimes(1);

    const categoryInput = screen.getByLabelText('Category');
    const difficultyInput = screen.getByLabelText('Difficulty');
    const typeInput = screen.getByLabelText('Type');
    const resetSettingsButton = screen.getByTestId("btn-reset-settings");
    const applyChangeButton = screen.getByTestId("btn-change-settings");
    
    expect(categoryInput).toBeInTheDocument();
    expect(difficultyInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(resetSettingsButton).toBeInTheDocument();
    expect(applyChangeButton).toBeInTheDocument();
  });

  it('avalia a renderização do componente Settings com um game válido', async () => {
    const INICIAL_STATE_1 = {
      player: {
        name: '',
        gravatarEmail: '',
        score: 0,
        assertions: 0,
      },
      game: {
        questions: {},
        settings: {
          category: '10',
          difficulty: 'easy',
          type: 'multiple',
        },
      }
    };
    
    renderWithRouterAndRedux(<App />, INICIAL_STATE_1, '/');
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(fetchQuestionsSucess) }));
    expect(fetchMock).toBeCalled();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));
    const categoryElement = screen.getByTestId("question-category");
    expect(categoryElement).toHaveTextContent("Entertainment: Books");
  });

  it('avalia a completa do comportamento do fetch ao alterar as configurações', async () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(categories) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(filterQuestionsAPI) }));
    
    const buttonSettings = screen.getByTestId("btn-settings");
    userEvent.click(buttonSettings);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    const categoryInput = screen.getByLabelText('Category');
    const difficultyInput = screen.getByLabelText('Difficulty');
    const typeInput = screen.getByLabelText('Type');
    const resetSettingsButton = screen.getByTestId("btn-reset-settings");
    const applyChangeButton = screen.getByTestId("btn-change-settings");

    userEvent.click(resetSettingsButton);
    userEvent.selectOptions(categoryInput, ["Geography"]);
    userEvent.selectOptions(difficultyInput, ["easy"]);
    userEvent.selectOptions(typeInput, ["boolean"]);
    userEvent.click(applyChangeButton);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    
    expect(buttonPlay).toBeInTheDocument();
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));
    filterQuestionsAPI.results.forEach(() => {
      const categoryElement = screen.getByTestId("question-category");
      expect(categoryElement).toHaveTextContent("Geography");

      const buttonsAnswers = screen.getAllByRole('button');
      expect(buttonsAnswers).toHaveLength(2);

      const correctAnswerElement = screen.getByTestId("correct-answer");
      userEvent.click(correctAnswerElement);

      userEvent.click(screen.getByTestId("btn-next"));
    });
  });

  it('avalia a renderização do componente Settings com um game inválido', async () => {
    const INICIAL_STATE_2 = {
      player: {
        name: '',
        gravatarEmail: '',
        score: 0,
        assertions: 0,
      },
      game: {
        questions: {},
        settings: {
          category: '25',
          difficulty: 'medium',
          type: 'boolean',
        },
      }
    };
    
    renderWithRouterAndRedux(<App />, INICIAL_STATE_2, '/');
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(fetchQuestionsFailed) }));
    
    expect(fetchMock).toBeCalled();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    const errorMessage = screen.getByRole('heading', { name: 'Error: Invalid Parameter', level: 4 });
    const changeSettingButton = screen.getByRole('button', { name: 'Change Settings' });
    expect(errorMessage).toBeInTheDocument();
    expect(changeSettingButton).toBeInTheDocument();

    userEvent.click(changeSettingButton);

    expect(screen.getByTestId("settings-title")).toBeInTheDocument();
  });
});
