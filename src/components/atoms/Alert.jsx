import React from 'react';
import '../../assets/styles/AlertBox.css';

const AlertBox = ({ type, message, onClose }) => {
  return (
    <div className={`alert-box ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
        <i className="bi bi-x"></i>
      </button>
    </div>
  );
};

export default AlertBox;
