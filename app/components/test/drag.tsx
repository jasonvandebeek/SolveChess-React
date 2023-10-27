import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  name: string;
}

export default function DraggableComponent({ name }:Props) {
  const [, drag] = useDrag({
    type: 'DRAGGABLE_ITEM',
  });

  return (
    <div ref={drag} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
      {name}
    </div>
  );
};