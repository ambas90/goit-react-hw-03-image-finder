import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="button">
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
