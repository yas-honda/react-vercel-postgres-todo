
import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { Task } from './types';
import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/getTasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    try {
      const response = await fetch('/api/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTaskText }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      setNewTaskText('');
      await getTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-400 mt-4">Error: {error}</p>;
    }
    
    if (tasks.length === 0) {
        return <p className="text-center text-gray-400 mt-8">No tasks yet. Add one to get started!</p>;
    }

    return (
      <ul className="space-y-3 mt-6">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-brand-primary font-sans">
      <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Vercel To-Do List
          </h1>
          <p className="text-gray-400 mt-2">Powered by React & Vercel Postgres</p>
        </header>

        <main className="bg-brand-secondary p-6 rounded-lg shadow-2xl">
          <TaskForm
            newTaskText={newTaskText}
            setNewTaskText={setNewTaskText}
            handleAddTask={handleAddTask}
          />
          <div className="mt-6">
            {renderContent()}
          </div>
        </main>

        <footer className="text-center text-gray-500 mt-12 text-sm">
          <p>Built with modern web technologies.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
