import React from 'react';
import { useDrop } from 'react-dnd';

interface Props {
  droppedComponents: JSX.Element[];
  onDrop: (component: JSX.Element) => void;
}

export default function DraggableContainer({ droppedComponents, onDrop }: Props) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'DRAGGABLE_ITEM',
    drop: (item: JSX.Element) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid black',
      }}
    >
      <h3>Drop Here</h3>
      <div>
        {droppedComponents.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>
    </div>
  );
}
