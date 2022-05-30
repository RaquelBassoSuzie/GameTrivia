import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Ranking extends Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => b.score - a.score);
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.backToLogin }
        >
          Login
        </button>
        <div>
          { ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="Player" />
              <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              <span data-testid={ `player-score-${index}` }>{ player.score }</span>
            </div>
          )) }
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
