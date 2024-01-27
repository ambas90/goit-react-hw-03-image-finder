import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/character/';
class ApiCall extends Component {
  state = {
    characters: [],
    isLoading: false,
    error: null,
    activePage: 1,
    numberOfPages: 0,
  };
  getCharacters = async () => {
    this.setState({
      isLoading: true,
    });
    const { activePage } = this.state;
    try {
      const { data } = await axios(`?page=${activePage}`);
      console.log(data);
      this.setState({
        characters: data.results,
        numberOfPages: data.info.pages,
      });
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  async componentDidMount() {
    await this.getCharacters();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;
    console.log('oldState', oldState);
    console.log('next', nextState.characters);
    if (
      nextState.characters[0]?.name === oldState.characters[0]?.name &&
      nextState.activePage === oldState.activePage
    ) {
      return false;
    }
    return true;
  }
  async componentDidUpdate() {
    console.log('cdu');
    await this.getCharacters();
  }
  handleNextPage = () => {
    this.setState(prev => ({ activePage: prev.activePage + 1 }));
  };
  handlePreviousPage = () => {
    this.setState(prev => ({ activePage: prev.activePage - 1 }));
  };
  render() {
    const { characters, isLoading, error, activePage, numberOfPages } =
      this.state;
    return (
      <div>
        {isLoading && <p>loading...</p>}
        {error && <p>Sth went wrong...{error.message}</p>}
        {characters.map(({ id, name }) => (
          <p key={id}>{name}</p>
        ))}
        <button onClick={this.handlePreviousPage} disabled={activePage === 1}>
          Previous Page
        </button>
        <button
          onClick={this.handleNextPage}
          disabled={activePage === numberOfPages}
        >
          Next Page
        </button>
      </div>
    );
  }
}

export default ApiCall;
