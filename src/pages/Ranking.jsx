import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
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
        { /* 19 - Allyson - adicionar o conteudo da página de ranking */ }
        { /* 20 - a definir -
        realizar os testes da tela de ranking + teste adicionar na tela de feedback */ }
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
