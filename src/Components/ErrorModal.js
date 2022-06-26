import React from 'react';
import './ErrorModal.css';
const ErrorModal = (props) => {
  return (
    <div className='error-page' onClick={props.onErrorHandle}>
      <div className='error-box'>
        <div className='title text'>Incorrect city name.</div>
        <div className='errorMsg text'>Please enter a proper city name...</div>
      </div>
    </div>
  );
};
export default ErrorModal;
