import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => b.score - a.score);
    return (
      <section className="ranking-container">
        <section className="ranking-informations">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.backToLogin }
            className="btn btn-success"
          >
            Login
          </button>
          <div className="ranking-player">
            { ranking.map((player, index) => (
              <div key={ index } className="ranking-player-display">
                <img src={ player.picture } alt="Player" />
                <div>
                  <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                  <p>
                    Score:
                    {' '}
                    <span data-testid={ `player-score-${index}` }>{ player.score }</span>
                  </p>
                </div>
              </div>
            )) }
          </div>
        </section>
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
