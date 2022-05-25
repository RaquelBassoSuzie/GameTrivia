import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Login from './Login';
import QuestionCard from '../components/QuestionCard';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenValid: true,
      questions: [],
      loading: true,
      indexQuestions: 0,
    };
  }

  async componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    this.setState({ loading: true }, async () => {
      const token = localStorage.getItem('token');
      const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(URL);
      const data = await response.json();
      const errorCode = 3;
      if (data.response_code === errorCode) {
        const { history } = this.props;
        history.push('/');
      } else {
        this.setState({ questions: data.results, loading: false });
      }
    });
  }

  render() {
    const { tokenValid, questions, indexQuestions, loading } = this.state;
    if (!tokenValid) {
      localStorage.setItem('token', '');
      return <Login />;
    }
    return (
      <section>
        <Header />
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <QuestionCard question={ questions[indexQuestions] } />
        )}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
