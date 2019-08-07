import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import { DragAndDropZone, useHandleDrop } from './dragAndDropZone';
import Section from './section';

function App() {
  const [interactedQuestion, setInteractedQuestion] = useState(null);

  const [sections, setSections] = useState([
    { id: 1, title: 'Basic info' },
    { id: 2, title: 'Jobs' },
    { id: 3, title: 'Other' },
  ]);

  const [questions, setQuestions] = useState({
    1: [{ id: 1, name: 'First Name', sectionId: 1, }, { id: 2, name: 'Last Name', sectionId: 1, }],
    2: [{id: 3, name: 'Previous jobs', sectionId: 2,}],
    3: [{id: 4, name: 'Other information', sectionId: 3,}],
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
    const newSection = { id: id, title: `${id}`};

    setQuestions({...questions, [id]: []});
    setSections([...sections, newSection]);
  }, [questions, sections]);

  const handleAddQuestion = useCallback((section) => {
    setQuestions({
      ...questions,
      [section.id]: [
        ...questions[section.id],
        {
          id: Math.random() * 10000,
          name: 'Dummy question',
          sectionId: section.id,
        },
      ],
    })
  }, [questions]);

  const handleDeleteSection = useCallback((section) => {
    const newSections = sections.filter(s => s.id !== section.id);
    setSections(newSections);
  }, [sections]);

  const handleDeleteQuestion = useCallback((question) => {
    setQuestions({
      ...questions,
      [question.sectionId]: questions[question.sectionId].filter(({id}) => id !== question.id),
    })
  }, [questions]);

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Section Builder</h2>
      <button
        type="button"
        onClick={addSection}
        className={styles.addButton}
      >
        Add sub section
      </button>
      <DragAndDropZone
        items={sections}
        handleDrop={handleSectionDrop}
        renderItem={(item) => (
          <Section
            item={item}
            onAdd={handleAddQuestion}
            onDelete={handleDeleteSection}
            onDeleteQuestion={handleDeleteQuestion}
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
