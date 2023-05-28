import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { smallImg, bigImg, tags } = this.props;

    return (
      <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
        <img
          src={smallImg}
          alt={tags}
          className={css.ImageGalleryItem__image}
        />
        {this.state.showModal && (
          <Modal bigImg={bigImg} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
