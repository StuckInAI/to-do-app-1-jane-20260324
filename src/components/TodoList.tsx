'use client';

import { Todo } from '@/entities/Todo';

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => Promise<{ error?: string; success?: boolean }>;
  deleteTodo: (id: number) => Promise<{ error?: string; success?: boolean }>;
};

export default function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  async function handleToggle(id: number) {
    const result = await toggleTodo(id);
    if (result.error) {
      alert(result.error);
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      const result = await deleteTodo(id);
      if (result.error) {
        alert(result.error);
      }
    }
  }

  if (todos.length === 0) {
    return <p className="text-gray-500 text-center py-8">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleToggle(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div>
              <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}