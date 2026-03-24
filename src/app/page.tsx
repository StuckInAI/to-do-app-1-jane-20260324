import { getAllTodos, addTodo, toggleTodo, deleteTodo } from './actions/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default async function Home() {
  const todos = await getAllTodos();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}