import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <header>
        <Header />
        <section>
          <p data-testid="feedback-text">
            { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ Number(assertions) }</p>
          <button
            type="button"
            onClick={ this.backToLogin }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </section>
      </header>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
