import React from 'react';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <div>
        <h3>RANKING</h3>
        { ranking.map((player, index) => (
          <div key={ index }>
            <span data-testid={ `player-name-${index}` }>{ player.name }</span>
            <span data-testid={ `player-name-${index}` }>{ player.score }</span>
          </div>
        )) }
      </div>
    );
  }
}

export default Ranking;
