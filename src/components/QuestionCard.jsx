import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    const { question:
      { question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
        category,
      } } = this.props;
    const incorrectAnswersMap = incorrectAnswers
      .map((answer, index) => ({ type: false, answer, index }));
    const answers = [
      { type: true, answer: correctAnswer, index: null },
      ...incorrectAnswersMap,
    ];
    // Embaralhamentos dos elementos de um array proveniente da mentoria técnica com o instrutor Moisés Santana
    // link da referência utilizada: https://flaviocopes.com/how-to-shuffle-array-javascript/
    // Como o Math.random gera um número aleatório entre 0 e 0.99, reduzir 0.5 faz ele ser maior ou menor aleatoriamente resultando com comportamento do sort de ordenar em relação ao número retornado (ants ou depois)
    const HALF_NUMBER = 0.5;
    answers.sort(() => Math.random() - HALF_NUMBER);

    return (
      <section>
        <h3 data-testid="question-text">{ question }</h3>
        <p data-testid="question-category">{ category }</p>
        <div data-testid="answer-options">
          { answers.map(({ type, answer, index }) => {
            if (type) {
              return (
                <button
                  type="button"
                  key="correct-answer"
                  data-testid="correct-answer"
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ `wrong-answer-${index}` }
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>
            );
          })}
        </div>

      </section>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default QuestionCard;
