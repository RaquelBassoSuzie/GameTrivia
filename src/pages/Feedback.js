import React from 'react';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="REQUISITO 12 - ALTERAR" src="" />
        <h3 data-testid="header-player-name">Algum nome vem pra cá - REQUISITO 12</h3>
        <h3 data-testid="header-score">Algum placar - REQUISITO 12</h3>
        <p>Mensagem - REQUISITO 13</p>
        <p data-testid="feedback-total-score">{ Number(score) }</p>
        <span datat-testid="feedback-total-question">{ Number(assertions) }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isrequired;
