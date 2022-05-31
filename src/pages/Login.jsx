import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchTriviaQuestions from '../services/fetchToken';
import { changePlayer } from '../redux/actions';
import clearGame from '../redux/actions/clearGame';
import './Login.css';

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
      <section className="login-container">
        <div className="login-container-center">
          <img src={ logo } className="login-logo" alt="logo" />
          <form className="form-group login-form">
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                placeholder="Name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                placeholder="Email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.catchClickPlay }
              disabled={ isButtonDisabled }
              className="btn btn-primary"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.btnSettings }
              className="btn btn-light"
            >
              Settings
            </button>
          </form>
        </div>
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
