'use client';

import { useTaskContext } from "@/context/TaskContext";
import { TagColors } from "@/enums/enum";
import { Task } from "@/interfaces/interfaces";
import React, { useState, useRef, useEffect } from "react";

interface TaskCardProps {
  task: Task;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  onEditClick:(task:Task)=>void; 
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, dragHandleProps,onEditClick }) => {
  const { deleteTask } = useTaskContext();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuVisible(true);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteTask(task.id);
    setMenuVisible(false);
  };

  const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onEditClick(task)
    setMenuVisible(false);
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuVisible]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className="cursor-pointer bg-yellow-50 rounded text-sm relative p-2"
    >
      <div {...dragHandleProps} className="cursor-move text-gray-400 flex justify-end p-0">
        ::
      </div>
      <div className="font-bold">{task.title}</div>
      <div className="text-gray-600">
        {task.startTime} - {task.endTime}
      </div>
      <div
        className="text-xs p-1 rounded-sm"
        style={{ backgroundColor: TagColors[task.tag] }}
      >
        {task.tag}
      </div>

      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute bg-white shadow-md border p-3 rounded z-10 min-w-48   top-full px-5"
        >
          <div
            className="cursor-pointer hover:bg-gray-100 p-1"
            onClick={handleEdit}
          >
            Edit
          </div>
          <div
            className="cursor-pointer hover:bg-gray-100 p-1 text-red-500"
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
