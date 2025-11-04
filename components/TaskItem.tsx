
import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const ClockIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-start shadow-md transition-all duration-300 hover:bg-gray-700/50 hover:shadow-lg hover:scale-[1.02]">
      <span className="flex-1 mr-4 break-words">{task.text}</span>
      <div className="flex items-center text-xs text-gray-400 flex-shrink-0">
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>{new Date(task.created_at).toLocaleString()}</span>
      </div>
    </li>
  );
};
