import { AuthResponse, LoginRequest, RegisterRequest, Task, CreateTaskRequest, UpdateTaskRequest } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// A custom error to identify authentication issues easily
export class AuthError extends Error {
  constructor(message = 'Authentication error') {
    super(message);
    this.name = 'AuthError';
  }
}

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Centralized response handler
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      throw new AuthError('Session expired. Please log in again.');
    }
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred' }));
      throw new Error(errorData.message);
    }
    // For 204 No Content, which has no body
    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async register(data: RegisterRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await this.handleResponse<AuthResponse>(response);
    if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
    }
    return result;
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

export const apiClient = new ApiClient();