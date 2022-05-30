import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchTriviaQuestions from '../services/fetchToken';
import { changePlayer } from '../redux/actions';
import clearGame from '../redux/actions/clearGame';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };
  }

  componentDidMount() {
    const { resetScore } = this.props;
    resetScore();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => {
      const { name, email } = this.state;
      // Resolução da verificação do email proveniente do projeto Tryunfo do Guilherme Fernandes
      // sourse: https://github.com/tryber/sd-020-b-project-trybetunes/pull/33/files
      const check = [
        (!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
        name.length > 0,
      ];
      if (check.every((item) => item === true)) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  catchClickPlay = async () => {
    const { token } = await fetchTriviaQuestions();
    const { handleChangePlayer } = this.props;
    localStorage.setItem('token', token);
    const { name, email } = this.state;
    const result = {
      name,
      email,
    };
    handleChangePlayer(result);
    const { history } = this.props;
    history.push('/game');
  }

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.btnSettings }
        >
          settings
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  handleChangePlayer: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleChangePlayer: (payload) => dispatch(changePlayer(payload)),
  resetScore: () => dispatch(clearGame()),
});

export default connect(null, mapDispatchToProps)(Login);
