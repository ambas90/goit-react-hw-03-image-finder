import './Modal.css';

const Modal = ({ handleClick, src }) => {
  return (
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default Modal;
