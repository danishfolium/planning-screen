'use client';

import { Task, User } from '@/interfaces/interfaces';
import React, { createContext, useContext, useState } from 'react';
import data from "@/data/data.json"
import { TaskTag } from '@/enums/enum';

type TaskContextType = {
  tasks: Task[];
  users: User[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const users = data.users
  const [tasks, setTasks] = useState<Task[]>(data.tasks.map((task) => ({
    ...task,
    tag: task.tag as TaskTag,
  })));

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            ...updatedTask,
          }
          : task
      )
    );
  };


  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  return (
    <TaskContext.Provider
      value={{ tasks, users, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};


export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};
