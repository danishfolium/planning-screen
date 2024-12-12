'use client';

import { useDroppable, useDraggable } from '@dnd-kit/core';
import { cloneElement } from 'react';

export function DroppableContainer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="border">
      {children}
    </div>
  );
}

interface DraggableItemProps {
  id: string;
  children: React.ReactElement<{ dragHandleProps?: React.HTMLAttributes<HTMLDivElement> }>; // React element that accepts dragHandleProps
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      {cloneElement(children, { dragHandleProps: listeners })}
    </div>
  );
};