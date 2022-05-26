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
    let message = 'Could be better...';
    const THREE = 3;
    if (assertions >= THREE) {
      message = 'Well Done!';
    }
    return (
      <header>
        <Header />
        <section>
          <p data-testid="feedback-text">{ message }</p>
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
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
