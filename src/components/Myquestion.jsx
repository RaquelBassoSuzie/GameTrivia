import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showNextBtn: false,
      indexQuestions: 0,
    };
  }

  answerQuestion = () => {
    this.setState({ showNextBtn: true });
  }

  nextQuestion = () => {
    const maxQuestions = 4;
    const { indexQuestions } = this.state;
    this.setState((prevState) => ({
      showNextBtn: false,
      indexQuestions: prevState.indexQuestions + 1,
    }));
    const { backToFeedback } = this.props;
    if (indexQuestions === maxQuestions) {
      backToFeedback();
    }
  }

  render() {
    const { questions: atualQuestion } = this.props;
    const { indexQuestions, showNextBtn } = this.state;
    const { question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category,
    } = atualQuestion[indexQuestions];
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
                  onClick={ this.answerQuestion }
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
                onClick={ this.answerQuestion }
              >
                { answer }
              </button>
            );
          })}
        </div>
        { showNextBtn
          ? (
            <button
              data-testid="btn-next"
              id="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Next
            </button>) : ''}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(QuestionCard);
