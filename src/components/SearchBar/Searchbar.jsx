import { Component } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    inputText: '',
  };

  handleChange = evt => {
    this.setState({ inputText: evt.target.value });
  };

  handleSubmit = evt => {
    const form = evt.currentTarget;
    evt.preventDefault();
    this.props.onSubmit(this.state.inputText);
    this.setState({
      inputText: '',
    });
    form.reset();
  };

  render() {
    const { imputText } = this.state;
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imputText}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
