import React, { useCallback } from 'react';
import styles from './DragAndDropZone.module.css';

const DRAGGED_KEY = 'DRAGGED_ITEM_INDEX';

export const useHandleDrop = (items, setItems, ...deps) => useCallback((event, item) => {
  let draggedItemIndex = event.dataTransfer.getData(DRAGGED_KEY);

  let targetItemIndex = items.findIndex(
    ({ id }) => id === item.id,
  );

  const draggedItem = items[draggedItemIndex];

  const newItems = [...items];
  newItems.splice(draggedItemIndex, 1);
  newItems.splice(targetItemIndex, 0, draggedItem);

  setItems(newItems);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [items, setItems, ...deps])


const DragAndDropZone = ({
  items,
  handleDrop,
  renderItem,
  handleDragStart = () => {},
  containerStyles,
  itemContainerStyles,
}) => {
  const onDragStart = useCallback(
    (event, item) => {
      let draggedItemIndex = items.findIndex(
        ({ id }) => id === item.id,
      );
      event.dataTransfer.setData(DRAGGED_KEY, draggedItemIndex);

      handleDragStart(item);
    },
    [handleDragStart, items],
  );

  const onDragOver = useCallback((event) => event.preventDefault(), []);

  return (
    <div className={ containerStyles || styles.dragContainer}>
      {items.map(item => (
        <div
          key={item.id}
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
