import { Component } from 'react';
import './App.css';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Notiflix from 'notiflix';

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
    modalIsOpen: false,
    largeImageUrl: '',
  };

  searchImages = query => {
    if (query.trim() === '') {
      Notiflix.Notify.info('Sorry, please provide a search word');
      return;
    }
    this.setState({
      images: [],
      activePage: 1,
      searchQuery: `${Date.now()}/${query}`,
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

  showModal = largeImageUrl => {
    this.setState({
      modalIsOpen: true,
      largeImageUrl: largeImageUrl,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  handleKeyDown = evt => {
    if (evt.key === 'Escape' && this.state.modalIsOpen) {
      this.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getImages = async () => {
    this.setState({
      isLoading: true,
    });
    const { activePage, searchQuery } = this.state;
    const separated = searchQuery.split('/');
    const exstractedQuery = separated[1];
    try {
      const { data } = await axios({
        params: {
          q: exstractedQuery,
          page: activePage,
          key: apiKey,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      });
      if (data.total === 0) {
        Notiflix.Notify.warning(`
I couldn't find any images`);
      }
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
    const { images, isLoading, modalIsOpen, largeImageUrl, error } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.searchImages} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              prewImgUrl={image.webformatURL}
              largeImgUrl={image.largeImageURL}
              tags={image.tags}
              handleClick={this.showModal}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {error && <p>Sth went wrong...{error.message}</p>}
        {this.showLoadMore() > 0 && (
          <Button handleClick={this.loadMoreImages} />
        )}
        {modalIsOpen && (
          <Modal src={largeImageUrl} handleClick={this.closeModal} />
        )}
      </div>
    );
  }
}
