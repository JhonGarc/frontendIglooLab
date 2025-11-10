export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  code: number;
  message?: string;
  data?: T;
  error?: string;
}

