import React from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import fetchTriviaQuestions from '../fetch';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => {
      const { name, email } = this.state;
      const check = [
        (!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
        name.length > 0,
      ];
      if (check.every((item) => item === true)) {
        this.setState({ isButtonDisabled: false });
      }
    });
  }

  catchClickPlay = async () => {
    // const { state } = this;
    const token = await fetchTriviaQuestions();
    const { history } = this.props;
    localStorage.setItem('token', token.token);
    history.push('/game');
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <section>
        <img src={ logo } className="App-logo" alt="logo" />
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.catchClickPlay }
          disabled={ isButtonDisabled }
        >
          Play
        </button>

      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
