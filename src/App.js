import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import DragAndDropZone, { useHandleDrop } from './DragAndDropZone';

const Item = ({ item }) => (
  <div
    className={styles.item}
  >
    {item.title}
  </div>
)

function App() {
  const [sections, setSections] = useState([
    { id: 1, title: 'Section 1' }, { id: 2, title: 'Section 2' }, { id: 3, title: 'Section 3' },
  ]);

  const handleDrop = useHandleDrop(sections, setSections);

  const addSection = useCallback(() => {
    const id = Math.random() * 10000;
    const newSection = { id: id, title: `${id}`};

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
        handleDrop={handleDrop}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
}

export default App;
