'use client';

import React from 'react';
import DraggableComponent from '../components/test/drag';
import DraggableContainer from '../components/test/drop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Page() {
  const [droppedComponents, setDroppedComponents] = React.useState<JSX.Element[]>([]);

  const handleDrop = (component: JSX.Element) => {
    setDroppedComponents([...droppedComponents, component]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <div>
          <h2>Draggable Items</h2>
          <DraggableComponent name="Item 1"/>
          <DraggableComponent name="Item 2"/>
          <DraggableComponent name="Item 3"/>
        </div>
        <div>
          <h2>Drop Zone</h2>
          <DraggableContainer droppedComponents={droppedComponents} onDrop={handleDrop}/>
        </div>
      </div>
    </DndProvider>
  );
}