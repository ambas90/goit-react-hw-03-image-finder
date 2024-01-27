import PropTypes from 'prop-types';

const ImageGalleryItem = ({ prewImgUrl, largeImgUrl, tags, id }) => {
  return (
    <li key={id} className="gallery-item">
      <img src={prewImgUrl} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  prewImgUrl: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string,
  id: PropTypes.number.isRequired,
};
