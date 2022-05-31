import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Ranking.css';

class Ranking extends Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const maxRanking = 3;
    ranking.sort((a, b) => b.score - a.score);
    const rankingFilter = ranking.filter((info) => ranking.indexOf(info) < maxRanking);
    return (
      <section className="ranking-container">
        <Header />
        <section className="ranking-informations">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          <div className="ranking-player">
            { rankingFilter.map((player, index) => (
              <div key={ index } className="ranking-player-display">
                <img src={ player.picture } alt="Player" />
                <p data-testid={ `player-name-${index}` }>
                  Name:
                  {' '}
                  { player.name }
                </p>
                <p>
                  Score:
                  {' '}
                  <span data-testid={ `player-score-${index}` }>{ player.score }</span>
                </p>
              </div>
            )) }
          </div>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.backToLogin }
            className="btn btn-success"
          >
            Login
          </button>
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
