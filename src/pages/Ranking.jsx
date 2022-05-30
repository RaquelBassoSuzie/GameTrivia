import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          <h3>RANKING</h3>
          { ranking.map((player, index) => (
            <div key={ index }>
              <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              <span data-testid={ `player-name-${index}` }>{ player.score }</span>
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
