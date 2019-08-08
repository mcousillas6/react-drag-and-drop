import React from 'react';
import ActionButtons from '../actionButtons';
import styles from './styles.module.css';

// TODO: wire up onDelete & onEdit
const Question = ({ item, onDelete, onEdit }) => (
  <div
    className={styles.question}
  >
    <p className={styles.questionTitle}>{item.name}</p>
    <ActionButtons
      containerStyles={styles.buttonContainer}
      onDelete={() => onDelete(item)}
      onEdit={onEdit}
    />

    <input
      className={styles.questionInput}
      type="text"
      placeholder={item.name}
    />
  </div>
);

export default Question;
