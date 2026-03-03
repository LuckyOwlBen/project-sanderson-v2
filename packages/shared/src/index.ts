/**
 * Shared types and utilities accessible from both frontend and backend
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}
