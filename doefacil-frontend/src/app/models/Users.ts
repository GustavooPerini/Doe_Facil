export type Role = 'USER' | 'ADMIN';

export interface Users {
  id: number;
  name: string;
  email: string;
  role: Role;
  enabled?: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página atual (0-based)
  size: number;
}