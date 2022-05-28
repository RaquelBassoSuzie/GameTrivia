import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

const categories = {
  "trivia_categories": [
    { id:9, name:"General Knowledge" },
    { id:10, name:"Entertainment: Books" },
    { id:11, name:"Entertainment: Film" },
    { id:12, name:"Entertainment: Music" },
    { id:13, name:"Entertainment: Musicals & Theatres" },
    { id:14, name:"Entertainment: Television" },
    { id:15, name:"Entertainment: Video Games" },
    { id:16, name:"Entertainment: Board Games" },
    { id:17, name:"Science & Nature" },
    { id:18, name:"Science: Computers" },
    { id:19, name:"Science: Mathematics" },
    { id:20, name:"Mythology" },
    { id:21, name:"Sports" },
    { id:22, name:"Geography" },
    { id:23, name:"History" },
    { id:24, name:"Politics" },
    { id:25, name:"Art" },
    { id:26, name:"Celebrities" },
    { id:27, name:"Animals" },
    { id:28, name:"Vehicles" },
    { id:29, name:"Entertainment: Comics" },
    { id:30, name:"Science: Gadgets" },
    { id:31, name:"Entertainment: Japanese Anime & Manga" },
    { id:32, name:"Entertainment: Cartoon & Animations" },
  ],
};

const fetchQuestionsSucess = {"response_code":0,"results":[{"category":"Entertainment: Books","type":"multiple","difficulty":"easy","question":"What was the name of Captain Nemo&#039;s submarine in &quot;20,000 Leagues Under the Sea&quot;?","correct_answer":"The Nautilus","incorrect_answers":["The Neptune","The Poseidon  ","The Atlantis"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"easy","question":"Which famous spy novelist wrote the childrens&#039; story &quot;Chitty-Chitty-Bang-Bang&quot;?","correct_answer":"Ian Fleming","incorrect_answers":["Joseph Conrad","John Buchan","Graham Greene"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"easy","question":"How many Harry Potter books are there?","correct_answer":"7","incorrect_answers":["8","5","6"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"easy","question":"What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?","correct_answer":"A Study in Scarlet","incorrect_answers":["The Sign of the Four","A Case of Identity","The Doings of Raffles Haw"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"easy","question":"Which is NOT a book in the Harry Potter Series?","correct_answer":"The House Elf","incorrect_answers":["The Chamber of Secrets","The Prisoner of Azkaban","The Deathly Hallows"]}]};

const fetchQuestionsFailed = { response_code: 1, results: [] };

describe('Verifica o comportamento da aplicação na página de Settings', () => {
  it('avalia a renderização do componente Settings', async () => {
    const { debug } = renderWithRouterAndRedux(<App />, {}, '/');

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(categories) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(fetchQuestionsSucess) }));
    
    const buttonSettings = screen.getByTestId("btn-settings");
    userEvent.click(buttonSettings);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(fetchMock).toBeCalledTimes(1);

    const categoryInput = screen.getByLabelText('Category');
    expect(categoryInput).toBeInTheDocument();

    const difficultyInput = screen.getByLabelText('Difficulty');
    expect(difficultyInput).toBeInTheDocument();

    const typeInput = screen.getByLabelText('Type');
    expect(typeInput).toBeInTheDocument();

    const resetSettingsButton = screen.getByTestId("btn-reset-settings");
    expect(resetSettingsButton).toBeInTheDocument();

    const applyChangeButton = screen.getByTestId("btn-change-settings");
    expect(applyChangeButton).toBeInTheDocument();

    userEvent.click(resetSettingsButton);
    userEvent.selectOptions(categoryInput, ["Entertainment: Books"]);
    userEvent.selectOptions(difficultyInput, ["easy"]);
    userEvent.selectOptions(typeInput, ["multiple"]);
    userEvent.click(applyChangeButton);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));
    
    // debug();

    // const errorFetch = screen.findByRole('heading', { name: 'Error: Invalid Parameter', level: 4 });
    // await waitFor(() => expect(errorFetch).toBeInTheDocument());
    
    
  });

  it('avalia a renderização do componente Settings com um game invalido', async () => {
    const { debug } = renderWithRouterAndRedux(<App />, {}, '/');

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(categories) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(fetchQuestionsFailed) }));
    
    const buttonSettings = screen.getByTestId("btn-settings");
    userEvent.click(buttonSettings);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(fetchMock).toBeCalled();

    const categoryInput = screen.getByLabelText('Category');
    expect(categoryInput).toBeInTheDocument();

    const difficultyInput = screen.getByLabelText('Difficulty');
    expect(difficultyInput).toBeInTheDocument();

    const typeInput = screen.getByLabelText('Type');
    expect(typeInput).toBeInTheDocument();

    const resetSettingsButton = screen.getByTestId("btn-reset-settings");
    expect(resetSettingsButton).toBeInTheDocument();

    const applyChangeButton = screen.getByTestId("btn-change-settings");
    expect(applyChangeButton).toBeInTheDocument();

    userEvent.click(resetSettingsButton);
    userEvent.selectOptions(categoryInput, ["Art"]);
    userEvent.selectOptions(difficultyInput, ["medium"]);
    userEvent.selectOptions(typeInput, ["boolean"]);
    userEvent.click(applyChangeButton);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Meu Nome');
    userEvent.type(emailInput, 'meu-email@teste.com');
    userEvent.click(buttonPlay);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));
    
    // debug();

    // const errorFetch = screen.findByRole('heading', { name: 'Error: Invalid Parameter', level: 4 });
    // await waitFor(() => expect(errorFetch).toBeInTheDocument());
    
    
  });
});