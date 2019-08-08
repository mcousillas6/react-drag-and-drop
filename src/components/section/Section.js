import React, { useState, useCallback } from 'react';
import Question from '../Question';
import { DragAndDropZone } from '../DragAndDropZone';
import ActionButtons from '../ActionButtons';
import styles from './styles.module.css';
import Separator from '../Separator';
import QuestionModal from '../QuestionModal';

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
  const [isOpen, setIsOpen] = useState(false);
  const handleAddQuestion = useCallback(
    () => {
      onAdd(item);
      setIsOpen(false);
    },
    [item, onAdd],
  );
  const { title } = item;

  return (
    <>
      <QuestionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddQuestion} // TODO: replace
      />
      <div
        className={styles.section}
      >
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title}</p>
          <ActionButtons
            containerStyles={styles.buttonContainer}
            onDelete={() => onDelete(item)}
            onEdit={onEdit}
          />
        </div>
        <DragAndDropZone
          items={questions}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          containerStyles={styles.sectionContent}
          itemContainerStyles={styles.sectionContainer}
          renderItem={(item) => <Question item={item} onDelete={onDeleteQuestion}/>}
        />
        <button
          className={styles.add}
          onClick={() => setIsOpen(true)}
        >
          + Add Question
        </button>
      </div>
    </>
  )
};

export default Section;
