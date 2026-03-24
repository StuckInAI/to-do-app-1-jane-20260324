'use server';

import { AppDataSource } from '@/data-source';
import { Todo } from '@/entities/Todo';

export async function getAllTodos() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const todoRepository = AppDataSource.getRepository(Todo);
    return await todoRepository.find({ order: { createdAt: 'DESC' } });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = new Todo();
    todo.title = title.trim();
    todo.completed = false;
    await todoRepository.save(todo);
    return { success: true };
  } catch (error) {
    console.error('Error adding todo:', error);
    return { error: 'Failed to add todo' };
  }
}

export async function toggleTodo(id: number) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({ where: { id } });
    if (!todo) {
      return { error: 'Todo not found' };
    }
    todo.completed = !todo.completed;
    await todoRepository.save(todo);
    return { success: true };
  } catch (error) {
    console.error('Error toggling todo:', error);
    return { error: 'Failed to update todo' };
  }
}

export async function deleteTodo(id: number) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const todoRepository = AppDataSource.getRepository(Todo);
    await todoRepository.delete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo' };
  }
}