import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Utilização da biblioteca HE para solucuinar caracteres especiais proveniente de uma thread
// no Slack da turma 10 tribo A - Fornecida pelo instrutor Moisés Santana
// link: https://trybecourse.slack.com/archives/C01L16B9XC7/p1624048607142200
import { decode } from 'he';
import { updateScoreAndAssertions } from '../redux/actions';
import './QuestionCard.css';

class QuestionCard extends React.Component {
  handleClickRight = () => {
    const { indexQuestions, questions, countTime, updateScore, afterAnswer } = this.props;
    const { difficulty } = questions[indexQuestions];
    afterAnswer();
    const difficultyScore = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;
    const score = TEN + (countTime * difficultyScore[difficulty]);
    updateScore(score);
  };

  handleClickWrong = () => {
    const { afterAnswer } = this.props;
    afterAnswer();
  };

  render() {
    const { indexQuestions,
      questions: atualQuestion,
      countTime,
      isDisabled,
      nextQuestion,
      showNextBtn,
      style,
    } = this.props;
    const { question, category, answers } = atualQuestion[indexQuestions];
    return (
      <section className="question-card-container">
        <section className="question-card-question-container">
          <p className="question-card-timer">{countTime}</p>
          <div className="question-card-quest-and-category-container">
            <h3 data-testid="question-text">{ decode(question) }</h3>
            <h5 data-testid="question-category">{ category }</h5>
          </div>
          <div data-testid="answer-options" className="question-card-options-container">
            { answers.map(({ type, answer, index }) => {
              if (type) {
                return (
                  <button
                    type="button"
                    key="correct-answer"
                    data-testid="correct-answer"
                    style={ style ? (
                      { border: '3px solid rgb(6, 240, 15)' })
                      : { color: 'black' } }
                    disabled={ isDisabled }
                    onClick={ this.handleClickRight }
                    className="btn btn-secondary"
                  >
                    { decode(answer) }
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ `wrong-answer-${index}` }
                  data-testid={ `wrong-answer-${index}` }
                  style={ style ? { border: '3px solid red' } : { color: 'black' } }
                  disabled={ isDisabled }
                  onClick={ this.handleClickWrong }
                  className="btn btn-secondary"
                >
                  { decode(answer) }
                </button>
              );
            })}
          </div>
        </section>
        { showNextBtn && (
          <button
            data-testid="btn-next"
            id="btn-next"
            type="button"
            onClick={ nextQuestion }
            className="btn btn-light"
          >
            Next
          </button>)}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  indexQuestions: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  countTime: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  afterAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showNextBtn: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  style: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (payload) => dispatch(updateScoreAndAssertions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
