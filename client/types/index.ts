export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
  category: 'to-do' | 'in-progress' | 'wont-do';
  isPublic: boolean;
  __v: number;
}

export interface AuthResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  completed: boolean;
  category: 'to-do' | 'in-progress' | 'wont-do';
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  category?: 'to-do' | 'in-progress' | 'wont-do';
}