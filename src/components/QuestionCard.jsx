import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScoreAndAssertions } from '../redux/actions';

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
      <section>
        <p>{countTime}</p>
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
                  style={ style ? (
                    { border: '3px solid rgb(6, 240, 15)' })
                    : { color: 'black' } }
                  disabled={ isDisabled }
                  onClick={ this.handleClickRight }
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
                style={ style ? { border: '3px solid red' } : { color: 'black' } }
                disabled={ isDisabled }
                onClick={ this.handleClickWrong }
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
              onClick={ nextQuestion }
            >
              Next
            </button>) : ''}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  indexQuestions: PropTypes.number.isRequired,
  questions: PropTypes.objectOf(PropTypes.string).isRequired,
  countTime: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  afterAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showNextBtn: PropTypes.func.isRequired,
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
