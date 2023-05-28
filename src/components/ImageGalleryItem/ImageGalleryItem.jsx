import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ smallImg, bigImg, tags }) {
  const [showModal, setShowMofal] = useState(false);

  const toggleModal = () => {
    setShowMofal(!showModal);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={toggleModal}>
      <img src={smallImg} alt={tags} className={css.ImageGalleryItem__image} />
      {showModal && <Modal bigImg={bigImg} onClose={toggleModal} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
