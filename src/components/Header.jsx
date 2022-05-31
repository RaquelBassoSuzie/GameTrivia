import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${md5(gravatarEmail)}`;
    return (
      <header className="header-container">
        <div className="header-user-info">
          <img
            src={ url }
            alt="Foto"
            data-testid="header-profile-picture"
            className="header-profile-photo"
          />
          <h3 data-testid="header-player-name" className="header-profile-name">
            Player:
            {' '}
            { name }
          </h3>
        </div>
        <h4 className="header-score">
          Score:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </h4>
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
