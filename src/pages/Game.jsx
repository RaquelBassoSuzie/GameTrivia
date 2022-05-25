import React from 'react';
import Header from '../components/Header';
import Login from './Login';

class Game extends React.Component {
  render() {
    const checkToken = localStorage.getItem('token')
    if (checkToken === undefined) {
      localStorage.setItem('token', '');
      return <Login />;
    }
    return (
      <section>
        <Header />
      </section>
    );
  }
}

export default Game;
