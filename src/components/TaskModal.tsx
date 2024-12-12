'use client';

import { useState } from 'react';
import { Task } from '@/interfaces/interfaces';
import { TaskTag } from '@/enums/enum';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Partial<Task>) => void;
}

export const TaskModal = ({ task, onClose, onSave }: TaskModalProps) => {
  const [editedTask, setEditedTask] = useState<Partial<Task>>({
    title: task.title,
    startTime: task.startTime,
    endTime: task.endTime,
    tag: task.tag,
  });

  const handleSave = () => {
    onSave(editedTask);
  };

  const timeOptions = Array.from({ length: 24 }, (_, hour) =>
    `${hour.toString().padStart(2, '0')}:00`
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96 text-black">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        Shift
        <input
          type="text"
          value={editedTask.title || ''}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border border-gray-300 p-2 w-full rounded mb-4"
          placeholder="Task Title"
        />
        Start Time
        <select
          value={editedTask.startTime || ''}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, startTime: e.target.value }))
          }
          className="border border-gray-300 p-2 w-full rounded mb-4"
        >
          <option value="" disabled>
            Select Start Time
          </option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        End Time
        <select
          value={editedTask.endTime || ''}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, endTime: e.target.value }))
          }
          className="border border-gray-300 p-2 w-full rounded mb-4"
        >
          <option value="" disabled>
            Select End Time
          </option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        Tag
        <select
          value={editedTask.tag || ''}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, tag: e.target.value as TaskTag }))
          }
          className="border border-gray-300 p-2 w-full rounded mb-4"
        >
          <option value="" disabled>
            Select a Tag
          </option>
          {Object.values(TaskTag).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
