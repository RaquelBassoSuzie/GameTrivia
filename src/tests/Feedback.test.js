import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
  it('avalia a renderização do componente Feedback', () => {
    const INICIAL_STATE_1 = {
      player: {
        name: 'Meu Nome',
        gravatarEmail: 'meu-email@teste.com',
        score: 0,
        assertions: 0,
      },
      game: {
        questions,
        settings: {
          category: '',
          difficulty: '',
          type: '',
        },
      }
    };

    renderWithRouterAndRedux(<App />, INICIAL_STATE_1, '/feedback');
    const arrayDataTestIdsHeader = [
      "header-profile-picture",
      "header-player-name",
      "header-score",
      "feedback-text",
      "feedback-total-score",
      "feedback-total-question",
      "btn-play-again"
    ];

    arrayDataTestIdsHeader.forEach((dataTestId) => {
      const infoElement = screen.getByTestId(dataTestId);
      expect(infoElement).toBeInTheDocument();
    });

    const messageFeedback = screen.getByTestId("feedback-text");
    expect(messageFeedback.innerHTML).toBe('Could be better...');
    expect(messageFeedback.innerHTML).not.toBe('Well Done!');

    const scoreFeedback = screen.getByTestId("feedback-total-score");
    expect(Number(scoreFeedback.innerHTML)).toBe(INICIAL_STATE_1.player.score);

    const assertionsFeedback = screen.getByTestId("feedback-total-question");
    expect(Number(assertionsFeedback.innerHTML)).toBe(INICIAL_STATE_1.player.assertions);
  });

  it('avalia a renderização do componente Feedback com duas questões corretas', () => {
    const INICIAL_STATE_2 = {
      player: {
        name: 'Meu Nome',
        gravatarEmail: 'meu-email@teste.com',
        score: 162,
        assertions: 2,
      },
      game: {
        questions,
        settings: {
          category: '',
          difficulty: '',
          type: '',
        },
      }
    };

    renderWithRouterAndRedux(<App />, INICIAL_STATE_2, '/feedback');

    const messageFeedback = screen.getByTestId("feedback-text");
    expect(messageFeedback.innerHTML).toBe('Could be better...');
    expect(messageFeedback.innerHTML).not.toBe('Well Done!');

    const scoreFeedback = screen.getByTestId("feedback-total-score");
    expect(Number(scoreFeedback.innerHTML)).toBe(INICIAL_STATE_2.player.score);

    const assertionsFeedback = screen.getByTestId("feedback-total-question");
    expect(Number(assertionsFeedback.innerHTML)).toBe(INICIAL_STATE_2.player.assertions);
  });

  it('avalia a renderização do componente Feedback com quatro questões corretas', () => {
    const INICIAL_STATE_3 = {
      player: {
        name: 'Meu Nome',
        gravatarEmail: 'meu-email@teste.com',
        score: 327,
        assertions: 4,
      },
      game: {
        questions,
        settings: {
          category: '',
          difficulty: '',
          type: '',
        },
      }
    };

    renderWithRouterAndRedux(<App />, INICIAL_STATE_3, '/feedback');

    const messageFeedback = screen.getByTestId("feedback-text");
    expect(messageFeedback.innerHTML).not.toBe('Could be better...');
    expect(messageFeedback.innerHTML).toBe('Well Done!');

    const scoreFeedback = screen.getByTestId("feedback-total-score");
    expect(Number(scoreFeedback.innerHTML)).toBe(INICIAL_STATE_3.player.score);

    const assertionsFeedback = screen.getByTestId("feedback-total-question");
    expect(Number(assertionsFeedback.innerHTML)).toBe(INICIAL_STATE_3.player.assertions);
  });

  it('avalia a renderização do componente Login ao clicar no botão Play Again', () => {
    const INICIAL_STATE_3 = {
      player: {
        name: 'Meu Nome',
        gravatarEmail: 'meu-email@teste.com',
        score: 327,
        assertions: 4,
      },
      game: {
        questions,
        settings: {
          category: '',
          difficulty: '',
          type: '',
        },
      }
    };

    const { history} = renderWithRouterAndRedux(<App />, INICIAL_STATE_3, '/feedback');

    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    userEvent.click(buttonPlayAgain);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
