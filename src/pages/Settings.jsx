import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      categoriesAPI: {},
      category: '',
      difficulty: '',
      type: '',
    };
  }

  async componentDidMount() {
    this.fetchCategories();
    this.updateSettingFromRedux();
  }

  updateSettingFromRedux = () => {
    const { settings } = this.props;
    this.setState({
      ...settings,
    });
  }

  fetchCategories = () => {
    this.setState({ loading: true }, async () => {
      const url = 'https://opentdb.com/api_category.php';
      const result = await fetch(url);
      const data = await result.json();
      this.setState({
        categoriesAPI: data.trivia_categories,
        loading: false,
      });
    });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  resetSettings = () => {
    this.setState({
      category: '',
      difficulty: '',
      type: '',
    });
  }

  handleSettingsChange = () => {
    const { updateSettingsFunc, history } = this.props;
    const { category, difficulty, type } = this.state;
    updateSettingsFunc({ category, difficulty, type });
    history.push('/');
  }

  render() {
    const { categoriesAPI, loading, category, difficulty, type } = this.state;
    return (
      <section>
        <h1 data-testid="settings-title">Settings</h1>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <form>
            <label htmlFor="category">
              Category
              <select
                name="category"
                id="category"
                value={ category }
                onChange={ this.handleChange }
              >
                <option value="">Default</option>
                {categoriesAPI.map(({ id, name }) => (
                  <option key={ id } value={ id }>{name}</option>
                ))}
              </select>
            </label>

            <label htmlFor="difficulty">
              Difficulty
              <select
                name="difficulty"
                id="difficulty"
                value={ difficulty }
                onChange={ this.handleChange }
              >
                <option value="">Default</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label htmlFor="type">
              Type
              <select
                name="type"
                id="type"
                value={ type }
                onChange={ this.handleChange }
              >
                <option value="">Default</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True or False</option>
              </select>
            </label>

            <button
              type="button"
              data-testid="btn-settings-change"
              onClick={ this.resetSettings }
            >
              Reset Settings
            </button>

            <button
              type="button"
              data-testid="btn-settings-change"
              onClick={ this.handleSettingsChange }
            >
              Apply
            </button>
          </form>
        )}

      </section>
    );
  }
}

Settings.propTypes = {
  updateSettingsFunc: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  settings: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.game.settings,
});

const mapDispatchToProps = (dispatch) => ({
  updateSettingsFunc: (payload) => dispatch(updateSettings(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
