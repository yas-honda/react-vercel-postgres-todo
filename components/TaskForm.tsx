
import React, { FormEvent } from 'react';

interface TaskFormProps {
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  handleAddTask: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ newTaskText, setNewTaskText, handleAddTask }) => {
  return (
    <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow w-full bg-gray-800 border-2 border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-colors"
      />
      <button
        type="submit"
        className="bg-brand-accent text-white font-bold py-2 px-6 rounded-md hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-accent transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!newTaskText.trim()}
      >
        Add Task
      </button>
    </form>
  );
};
