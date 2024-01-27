import PropTypes from 'prop-types';

const Button = ({ handleClick }) => {
  return <button onClick={handleClick}>Load More</button>;
};

export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
