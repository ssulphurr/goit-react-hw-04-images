import { Component } from 'react';
import css from './App.module.css';
import SearchForm from './Searchbar/Searchbar';
import api from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Buttom';
import Loader from './Loader/Loader';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    searchInput: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImages: null,
    error: null,
  };

  handleFormSubmit = searchInput => {
    if (searchInput !== this.state.searchInput) {
      this.setState({ searchInput, images: [], page: 1 });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchInput !== this.state.searchInput ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      const response = await api.fetchImages(
        this.state.searchInput,
        this.state.page
      );

      try {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          totalImages:
            Number(response.data.total) / Number(response.data.hits.length),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchInput, images, isLoading, totalImages, error } = this.state;

    return (
      <div className={css.App}>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />

        {isLoading ? <Loader /> : null}

        {images.length > 0 && <ImageGallery /> && totalImages > 1 && (
          <Button onClick={this.increasePage} />
        )}

        {searchInput && !images.length > 0 && !isLoading && (
          <h2 style={{ marginLeft: 40 }}> 0 images found</h2>
        )}

        {error && (
          <h2 style={{ marginLeft: 40 }}>
            Something went wrong: {error.message}
          </h2>
        )}
      </div>
    );
  }
}

App.propTypes = {
  searchInput: PropTypes.string,
};
