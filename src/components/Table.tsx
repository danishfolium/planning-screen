'use client';

import { useState, useEffect, useMemo } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DroppableContainer, DraggableItem } from './DragDropUtils';
import { useTaskContext } from '@/context/TaskContext';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { Task } from '@/interfaces/interfaces';

export default function Table() {
  const { tasks, users, updateTask } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const weekStart = useMemo(() => startOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);
  const weekDays: Date[] = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      console.error('No drop target found');
      return;
    }

    const taskId = String(active.id);
    const dropTargetId = String(over.id);
    const match = dropTargetId.match(/^([a-zA-Z0-9]+)-(\d{4}-\d{2}-\d{2})$/);

    if (match) {
      const [, newUserId, newDate] = match;

      if (newUserId && newDate) {
        updateTask(taskId, { userId: newUserId, day: newDate });
      }
    } else {
      console.error('Invalid drop target format:', dropTargetId);
    }
  };

  const openModal = (task: Task) => {
    setModalTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalTask(null);
  };

  const handleModalSave = (updatedTask: Partial<Task>) => {
    if (modalTask) {
      updateTask(modalTask.id, updatedTask);
    }
    handleModalClose();
  };

  const navigateWeek = (direction: 'previous' | 'next') => {
    setSelectedDate((prevDate) => addDays(prevDate, direction === 'previous' ? -7 : 7));
  };

  const filteredUsers = useMemo(
    () => users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [users, searchQuery]
  );

  return (
    <>
      <div className="flex items-center my-4 mx-auto w-max text-black">
        <button className="px-3 py-1" onClick={() => navigateWeek('previous')}>
          &lt;
        </button>
        <div className="px-3 py-1 border bg-white text-center rounded-md">
          {`${format(weekDays[0], 'dd MMM')} - ${format(weekDays[6], 'dd MMM')}`}
        </div>
        <button className="px-3 py-1" onClick={() => navigateWeek('next')}>
          &gt;
        </button>
      </div>

      {/* Drag-and-Drop Context */}
      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="grid text-black border border-gray-200 rounded-sm"
          style={{
            gridTemplateColumns: '200px repeat(7, 1fr)',
          }}
        >
          {/* Search Input */}
          <div className="font-bold text-center p-2">
            <input
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 rounded-sm p-1 w-full"
            />
          </div>

          {weekDays.map((day) => (
            <div key={day.toISOString()} className="text-center font-bold border-x-[1px] p-2">
              {format(day, 'd EEE')}
            </div>
          ))}
          {filteredUsers.map((user) => (
            <div key={`user-${user.id}`} className="contents">
              <div className="bg-gray-100 border text-black p-2 flex gap-3">
                <img src={user.avatar} className="rounded-full h-10 w-10" alt="avatar" />
                <div className="flex flex-col items-start gap-2">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm">{user.role}</div>
                </div>
              </div>

              {weekDays.map((day) => (
                <DroppableContainer
                  key={`${user.id}-${day.toISOString()}`}
                  id={`${user.id}-${format(day, 'yyyy-MM-dd')}`}
                >
                  <div className="flex flex-col gap-2 min-h-[100px] p-2">
                    {tasks
                      .filter(
                        (task) =>
                          task.userId === user.id &&
                          task.day === format(day, 'yyyy-MM-dd')
                      )
                      .map((task) => (
                        <DraggableItem key={task.id} id={String(task.id)}>
                          <TaskCard task={task} onEditClick={() => openModal(task)} />
                        </DraggableItem>
                      ))}
                  </div>
                </DroppableContainer>
              ))}
            </div>
          ))}
        </div>
      </DndContext>

      {isModalOpen && modalTask && (
        <TaskModal
          task={modalTask}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </>
  );
}