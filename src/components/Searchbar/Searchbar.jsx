import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function SearchForm({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInput = e => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInput.trim() === '') {
      reset();
      return alert('Fill the form to find something');
    }
    onSubmit(searchInput);
    reset();
  };

  const reset = () => {
    setSearchInput('');
  };

  return (
    <header className={css.Searchbar} onSubmit={handleSubmit}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}></span>
          <BsSearch color="black" size="24px" />
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={searchInput}
        />
      </form>
    </header>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
