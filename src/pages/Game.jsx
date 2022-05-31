import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { saveQuestions } from '../redux/actions';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      indexQuestions: 0,
      countTime: 30,
      isDisabled: false,
      showNextBtn: false,
      style: false,
    };
  }

  async componentDidMount() {
    const ONE_SECOND = 1000;
    this.fetchQuestions();
    // Aplicação do setInterval baseado na aula 12.1 do Gabriel Espindola
    // Código presente no link: https://github.com/tryber/sd-020-b-live-lectures/blob/lecture/12.1/trybem-estar/src/components/Timer.js
    this.interval = setInterval(() => {
      this.setState((prev) => ({
        countTime: prev.countTime - 1,
      }), () => {
        const { countTime } = this.state;
        if (countTime === 0) {
          this.setState({
            isDisabled: true,
            showNextBtn: true,
          }, () => clearInterval(this.interval));
        }
      });
    }, ONE_SECOND);
  }

  prepareOptionsForQuestion = (datas) => datas.map((data) => {
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = data;
    const incorrectAnswersMap = incorrectAnswers
      .map((answer, index) => ({ type: false, answer, index }));
    const answers = [
      { type: true, answer: correctAnswer, index: null },
      ...incorrectAnswersMap,
    ];
      // Embaralhamentos dos elementos de um array proveniente da mentoria técnica com o instrutor Moisés Santana
      // link da referência utilizada: https://flaviocopes.com/how-to-shuffle-array-javascript/
      // Como o Math.random gera um número aleatório entre 0 e 0.99, reduzir 0.5 faz ele ser maior ou menor aleatoriamente resultando com comportamento do sort de ordenar em relação ao número retornado (ants ou depois)
    const HALF_NUMBER = 0.5;
    answers.sort(() => Math.random() - HALF_NUMBER);
    return { ...data, answers };
  })

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
        const dataPrepare = this.prepareOptionsForQuestion(data.results);
        saveQuestionsStore(dataPrepare);
        this.setState({ loading: false });
      }
    });
  }

  afterAnswer = () => {
    this.setState({
      isDisabled: true,
      showNextBtn: true,
      style: true,
    });
  }

  nextQuestion = () => {
    const { indexQuestions } = this.state;
    const maxQuestions = 4;
    this.setState((prevState) => ({
      isDisabled: false,
      showNextBtn: false,
      countTime: 30,
      style: false,
      indexQuestions: prevState.indexQuestions + 1,
    }));
    if (indexQuestions === maxQuestions) {
      const { history, myName, email, myScore } = this.props;
      const actualRank = JSON.parse(localStorage.getItem('ranking')) || [];
      const result = {
        name: myName,
        picture: `https://www.gravatar.com/avatar/${md5(email)}`,
        score: myScore,
      };
      actualRank.push(result);
      localStorage.setItem('ranking', JSON.stringify(actualRank));
      history.push('/feedback');
    }
  }

  render() {
    const { indexQuestions,
      loading, countTime, isDisabled, showNextBtn, style } = this.state;

    return (
      <section className="game-container">
        <Header />
        {loading ? (
          <h4 className="game-loading">Loading...</h4>
        ) : (
          <QuestionCard
            indexQuestions={ indexQuestions }
            countTime={ countTime }
            isDisabled={ isDisabled }
            afterAnswer={ this.afterAnswer }
            nextQuestion={ this.nextQuestion }
            showNextBtn={ showNextBtn }
            style={ style }
          />
        )}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveQuestionsStore: PropTypes.func.isRequired,
  myName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  myScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  myName: state.player.name,
  email: state.player.gravatarEmail,
  myScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestionsStore: (payload) => dispatch(saveQuestions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
