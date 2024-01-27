import { Component } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '41220489-c07c1811e7eaf580f7e0f31fa';
const perPage = 12;

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    // activePage: 1,
    // numberOfPafes: 0,
  };

  getImages = async searchTerm => {
    this.setState({
      isLoading: true,
    });
    try {
      const { data } = await axios(
        `?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      console.log(data);
      this.setState({
        images: data.hits,
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

  loadMoreImages = () => {
    console.log('nacisnieto load more');
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getImages} />
        <ImageGallery images={images} />
        <Button handleClick={this.loadMoreImages} />
      </>
    );
  }
}
