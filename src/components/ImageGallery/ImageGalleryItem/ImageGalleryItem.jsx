import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ prewImgUrl, largeImgUrl, tags, handleClick }) => {
  return (
    <li className="imageGalleryItem" onClick={() => handleClick(largeImgUrl)}>
      <img src={prewImgUrl} alt={tags} className="imageGalleryItem-image" />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  prewImgUrl: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
