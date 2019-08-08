import React from 'react';
import deleteIcon from '../../assets/deleteIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import styles from './styles.module.css';

const ActionButtons = ({ containerStyles, onDelete, onEdit }) => (
  <div className={containerStyles}>
    <button
      className={styles.edit}
      onClick={onEdit}
    >
      <img src={editIcon} alt="edit button"/>
    </button>
    <button
      className={styles.delete}
      onClick={onDelete}
    >
      <img src={deleteIcon} alt="delete button"/>
    </button>
  </div>
);

export default ActionButtons;
