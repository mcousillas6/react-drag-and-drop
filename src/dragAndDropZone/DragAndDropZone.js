import React, { useCallback } from 'react';
import { DRAGGED_KEY } from './constants';
import styles from './styles.module.css';

const DragAndDropZone = ({
  items,
  handleDrop,
  renderItem,
  keyExtractor = item => item.id,
  handleDragStart = () => {},
  containerStyles,
  itemContainerStyles,
}) => {
  const onDragStart = useCallback(
    (event, draggedItem) => {
      let draggedItemIndex = items.findIndex(
        (item) => keyExtractor(item) === keyExtractor(draggedItem),
        );
        event.dataTransfer.setData(DRAGGED_KEY, draggedItemIndex);
        handleDragStart(draggedItem);
      },
    [handleDragStart, items, keyExtractor],
  );

  const onDragOver = useCallback((event) => event.preventDefault(), []);

  return (
    <div className={ containerStyles || styles.dragContainer}>
      {items.map(item => (
        <div
          key={keyExtractor(item)}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onDragOver={onDragOver}
          onDrop={(e) => handleDrop(e, item)}
          className={itemContainerStyles || styles.itemContainer}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default DragAndDropZone;
