import PropTypes from 'prop-types';
import './ImageGallery.css';

const ImageGallery = ({ children }) => {
  return <ul className="imageGallery ">{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
