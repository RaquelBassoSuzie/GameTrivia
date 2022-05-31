import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import photo1 from '../image/flock-happy.jpg';
import photo2 from '../image/flock-sad.jpg';
import './Feedback.css';

class Feedback extends React.Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <section className="feedback-container">
        <Header />
        <section className="feedback-informations">
          { assertions >= THREE
              && <img
                src={ photo1 }
                alt="Well Done"
                className="feedback-image-message"
              /> }
          { assertions < THREE
            && <img
              src={ photo2 }
              alt="Well Done"
              className="feedback-image-message"
            /> }

          <div>
            <p data-testid="feedback-text">
              { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
            </p>
            <p>
              Score:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </p>
            <p>
              Assertions:
              {' '}
              <span data-testid="feedback-total-question">{ Number(assertions) }</span>
            </p>
          </div>

          <aside className="feedback-button-section">
            <button
              type="button"
              onClick={ this.goToRanking }
              data-testid="btn-ranking"
              className="btn btn-info"
            >
              Ranking
            </button>

            <button
              type="button"
              onClick={ this.backToLogin }
              data-testid="btn-play-again"
              className="btn btn-success"
            >
              Play Again
            </button>
          </aside>
        </section>
      </section>
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
