import React from 'react';
import Question from '../question';
import { DragAndDropZone } from '../dragAndDropZone';
import ActionButtons from '../actionButtons';
import styles from './styles.module.css';

const Section = ({
  item,
  questions,
  handleDrop,
  handleDragStart,
  onDelete,
  onEdit,
  onAdd,
  onDeleteQuestion,
}) => {
  const { title } = item;
  return (
    <div
      className={styles.section}
    >
      <div className={styles.titleContainer}>
        <p className={styles.title}>{title}</p>
        <button
          className={styles.add}
          onClick={() => onAdd(item)}
        >
          Add Question
        </button>
        <button
          className={styles.edit}
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className={styles.delete}
          onClick={() => onDelete(item)}
        >
          Delete
        </button>
      </div>
      <DragAndDropZone
        items={questions}
        handleDrop={handleDrop}
        handleDragStart={handleDragStart}
        containerStyles={styles.sectionContent}
        itemContainerStyles={styles.questionContainer}
        renderItem={(item) => <Question item={item} onDelete={onDeleteQuestion}/>}
      />
    </div>
  )
};

export default Section;
