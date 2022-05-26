import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${md5(gravatarEmail)}`;
    return (
      <header>
        <img
          src={ url }
          alt="Foto"
          data-testid="header-profile-picture"
        />
        <div className="user-info">
          <h3 data-testid="header-player-name">
            Player:
            {' '}
            { name }
          </h3>
        </div>
        <span className="score">
          Score:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
