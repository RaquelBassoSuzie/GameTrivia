import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import gravatar + Photo from 'helpers/gravatar';
class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <header>
        <div className="user-info">
          <img
            src={ gravatar + foto(gravatar + email) }
            alt="user-profile"
            data-testid="header-profile-picture"
          />
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
const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});
export default connect(mapStateToProps)(Header);
Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
