import { Component } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '41220489-c07c1811e7eaf580f7e0f31fa';
const perPage = 12;

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    activePage: 1,
    searchQuery: '',
    totalImages: 0,
  };

  searchImages = query => {
    this.setState({
      images: [],
      activePage: 1,
      searchQuery: query,
    });
  };

  loadMoreImages = () => {
    this.setState(prev => ({ activePage: prev.activePage + 1 }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.activePage;
    const nexPage = this.state.activePage;

    if (prevQuery !== nextQuery || prevPage !== nexPage) {
      this.getImages();
    }
  };

  showLoadMore = () => {
    const { images, totalImages, activePage } = this.state;
    if (images.length > 0 && totalImages - perPage * activePage > 0) {
      return true;
    }
  };

  getImages = async () => {
    this.setState({
      isLoading: true,
    });
    const { activePage, searchQuery } = this.state;
    try {
      const { data } = await axios({
        params: {
          q: searchQuery,
          page: activePage,
          key: apiKey,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      });
      console.log(data);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalImages: data.total,
      }));
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

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {this.showLoadMore() > 0 && (
          <Button handleClick={this.loadMoreImages} />
        )}
        <Modal />
      </>
    );
  }
}
