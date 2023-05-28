import css from './App.module.css';
import SearchForm from './Searchbar/Searchbar';
import api from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Buttom';
import Loader from './Loader/Loader';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function App() {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = propSearchInput => {
    if (propSearchInput === searchInput) {
      return;
    }
    setSearchInput(propSearchInput);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchInput) {
      setIsLoading(true);

      const fetchData = async () => {
        const response = await api.fetchImages(searchInput, page);

        try {
          setImages([...images, ...response.data.hits]);
          setTotalImages(
            Number(response.data.total) / Number(response.data.hits.length)
          );
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [searchInput, images, page]);

  const increasePage = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <SearchForm onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />

      {isLoading ? <Loader /> : null}

      {images.length > 0 && <ImageGallery /> && totalImages > 1 && (
        <Button onClick={increasePage} />
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

App.propTypes = {
  searchInput: PropTypes.string,
};
