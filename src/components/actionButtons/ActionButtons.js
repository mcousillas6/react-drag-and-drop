import React from 'react';
import styles from './styles.module.css';

const ActionButtons = ({ containerStyles, onDelete, onEdit }) => (
  <div className={containerStyles}>
    <button
      className={styles.edit}
      onClick={onEdit}
    >
      edit
    </button>
    <button
      className={styles.delete}
      onClick={onDelete}
    >
      Delete
    </button>
  </div>
);

export default ActionButtons;
