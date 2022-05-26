import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QuestionCard extends React.Component {
  render() {
    const { indexQuestions,
      questions: atualQuestion,
      countTime, isDisabled,
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
                  disabled={ isDisabled }
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
                disabled={ isDisabled }
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

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(QuestionCard);
