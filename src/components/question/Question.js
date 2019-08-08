import React from 'react';
import ActionButtons from '../ActionButtons';
import Separator from '../Separator';
import styles from './styles.module.css';

// TODO: wire up onDelete & onEdit
const Question = ({ item, onDelete, onEdit }) => (
  <div
    className={styles.question}
  >
    <div className={styles.titleContainer}>
      <p className={styles.questionTitle}>{item.name}</p>
      <ActionButtons
        containerStyles={styles.buttonContainer}
        onDelete={() => onDelete(item)}
        onEdit={onEdit}
      />
    </div>
    <Separator />
    <p><b>Mandatory </b> <input type="checkbox" name="mandatory" checked={item.mandatory} /> </p>

    <p><b>Enables questions </b><input type="checkbox" name="enable_multiple" checked={item.enable_multiple} /> </p>

    <p> <b>Type: </b> {item.type}</p>

    <p> <b>Description: </b> {item.description}</p>

    <p> <b>Rich text description: </b> {item.long_description}</p>

    <p> <b>Placeholder: </b> {item.default_text}</p>
  </div>
);

export default Question;
