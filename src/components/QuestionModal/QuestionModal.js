import React from 'react';
import Modal from 'react-modal';
import closeIcon from '../../assets/closeIcon.svg';
import styles from './styles.module.css';

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const QuestionModal = ({ isOpen, onClose, onSubmit }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={modalStyles}
  >
    <div className={styles.container}>
      <button onClick={onClose} className={styles.close}>
        <img src={closeIcon} alt="close button" />
      </button>
      <div className={styles.inputContainer}>
        <input className={styles.input} type="text" placeholder="Name" />
        <input className={styles.input} type="text" placeholder="Type" />
        <button className={styles.add} onClick={onSubmit}> Add </button>
      </div>
    </div>
  </Modal>
);

export default QuestionModal;
