import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { saveQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
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
        localStorage.removeItem('token');
        history.push('/');
      } else {
        const { saveQuestionsStore } = this.props;
        saveQuestionsStore(data.results);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { indexQuestions, loading } = this.state;

    return (
      <section>
        <Header />
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <QuestionCard indexQuestions={ indexQuestions } />
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

const mapDispatchToProps = (dispatch) => ({
  saveQuestionsStore: (payload) => dispatch(saveQuestions(payload)),
});

export default connect(null, mapDispatchToProps)(Game);
