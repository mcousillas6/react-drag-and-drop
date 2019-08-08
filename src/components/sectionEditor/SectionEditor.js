import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';
import QUESTIONS from '../../sample/questions';
import SECTIONS from '../../sample/sections';
import idGenerator from '../../sample/idGenerator';
import { DragAndDropZone, useHandleDrop } from '../DragAndDropZone';
import Section from '../Section';

function SectionEditor() {
  const [interactedQuestion, setInteractedQuestion] = useState(null);

  const [sections, setSections] = useState(SECTIONS);

  const [questions, setQuestions] = useState(QUESTIONS);

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
    const id = idGenerator();
    const newSection = { id: id, title: `Section ${id}`};

    setQuestions({...questions, [id]: []});
    setSections([...sections, newSection]);
  }, [questions, sections]);

  const handleAddQuestion = useCallback((section) => {
    const id = idGenerator();
    setQuestions({
      ...questions,
      [section.id]: [
        ...questions[section.id],
        {
          id: id,
          name: `Dummy question ${id}`,
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
      <h1 className={styles.head}>Section Title</h1>
      <DragAndDropZone
        items={sections}
        handleDrop={handleSectionDrop}
        containerStyles={styles.sectionContent}
        itemContainerStyles={styles.sectionContainer}
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
      <button
        type="button"
        onClick={addSection}
        className={styles.addButton}
      >
        + Add Section
      </button>
    </div>
  );
}

export default SectionEditor;
