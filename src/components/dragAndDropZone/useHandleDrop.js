import { useCallback } from 'react';
import { DRAGGED_KEY } from './constants';

export default (items, setItems, ...deps) => useCallback((event, item) => {
  let draggedItemIndex = event.dataTransfer.getData(DRAGGED_KEY);
  console.log('fff');
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
