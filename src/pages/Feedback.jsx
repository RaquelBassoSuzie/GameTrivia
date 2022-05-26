import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    const { assertions } = this.props;
    const THREE = 3;
    if (assertions < THREE) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  }

  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { score, assertions } = this.props;
    const { message } = this.state;
    return (
      <header>
        <Header />
        <section>
          {/* <img data-testid="header-profile-picture" alt="REQUISITO 12 - ALTERAR" src="" />
          <h3 data-testid="header-player-name">Algum nome vem pra cá - REQUISITO 12</h3>
          <h3 data-testid="header-score">Algum placar - REQUISITO 12</h3> */}
          <p data-testid="feedback-text">{ message }</p>
          <p data-testid="feedback-total-score">{ Number(score) }</p>
          <span datat-testid="feedback-total-question">{ Number(assertions) }</span>
        </section>
        <button type="button" onClick={ this.backToLogin }>Play Again</button>
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
  assertions: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
