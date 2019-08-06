import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import DragAndDropZone, { useHandleDrop } from './DragAndDropZone';

const Section = ({ item, questions, handleDrop, handleDragStart, disableDrag }) => {
  const { title } = item;
  return (
    <div
      className={styles.section}
    >
      <p>{title}</p>
      <DragAndDropZone
        disableDrag={disableDrag}
        items={questions}
        handleDrop={handleDrop}
        handleDragStart={handleDragStart}
        containerStyles={styles.sectionContent}
        renderItem={(item) => <Question item={item} />}
      />
    </div>
  )
};

const Question = ({ item }) => (
  <div
    className={styles.question}
  >
    {item.name}
  </div>
);

function App() {
  const [interactedQuestion, setInteractedQuestion] = useState(null);

  const [sections, setSections] = useState([
    { id: 1, title: 'Section 1' },
    { id: 2, title: 'Section 2' },
    { id: 3, title: 'Section 3' },
  ]);

  const [questions, setQuestions] = useState({
    1: [{ id: 1, name: 'Question 1', sectionId: 1, }, { id: 2, name: 'Question 2', sectionId: 1, }],
    2: [{id: 1, name: 'Question 3', sectionId: 2,}],
    3: [{id: 1, name: 'Question 4', sectionId: 3,}],
  });

  const handleSectionDrop = useHandleDrop(sections, setSections);

  const handleQuestionDrop = useCallback((event, item) => {
    if (!interactedQuestion || !item.sectionId) return;

    let selectedQuestions = [...questions[item.sectionId]];

    let targetItemIndex = selectedQuestions.findIndex(
      ({ id }) => id === item.id,
    );

    let draggedItemIndex = selectedQuestions.findIndex(
      ({ id }) => id ===  (interactedQuestion && interactedQuestion.id),
    );

    if (draggedItemIndex === -1) return;

    selectedQuestions.splice(draggedItemIndex, 1);
    selectedQuestions.splice(targetItemIndex, 0, interactedQuestion);

    const updatedQuestions = { ...questions };
    updatedQuestions[item.sectionId] = selectedQuestions;
    setQuestions(updatedQuestions);
    setInteractedQuestion(null);
  }, [interactedQuestion, questions]);

  const handleQuestionDragStart = useCallback((question) => {
    setInteractedQuestion(question);
  }, [])

  const addSection = useCallback(() => {
    const id = Math.random() * 10000;
    const newSection = { id: id, title: `${id}`, questions: []};

    setSections([...sections, newSection]);
  }, [sections, setSections]);

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Form Builder</h2>
      <button
        type="button"
        onClick={addSection}
        className={styles.addButton}
      >
        Add section
      </button>
      <DragAndDropZone
        items={sections}
        handleDrop={handleSectionDrop}
        renderItem={(item) => (
          <Section
            item={item}
            questions={questions[item.id]}
            handleDrop={handleQuestionDrop}
            handleDragStart={handleQuestionDragStart}
          />
        )}
      />
    </div>
  );
}

export default App;
