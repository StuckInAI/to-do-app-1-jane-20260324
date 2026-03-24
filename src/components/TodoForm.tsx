'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

type TodoFormProps = {
  addTodo: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Adding...' : 'Add Todo'}
    </button>
  );
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await addTodo(formData);
    if (result.error) {
      setError(result.error);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      // Reset form
      const form = document.getElementById('todo-form') as HTMLFormElement;
      form?.reset();
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form action={handleSubmit} id="todo-form" className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Enter a new todo"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex items-center space-x-4">
        <SubmitButton />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">Todo added successfully!</p>}
      </div>
    </form>
  );
}