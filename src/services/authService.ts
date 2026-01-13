// Authentication Service
// Connects to Spring Boot Auth Controller endpoints

import { api, ApiResponse } from '@/lib/api';
import { ApiUser, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/api';

const AUTH_BASE = '/auth';

/**
 * Login with email and password
 * POST /api/v1/auth/login
 */
export async function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  return api.post<LoginResponse>(`${AUTH_BASE}/login`, data);
}

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export async function register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
  return api.post<RegisterResponse>(`${AUTH_BASE}/register`, data);
}

/**
 * Logout (invalidate token)
 * POST /api/v1/auth/logout
 */
export async function logout(): Promise<ApiResponse<void>> {
  return api.post<void>(`${AUTH_BASE}/logout`);
}

/**
 * Get current user profile
 * GET /api/v1/auth/me
 */
export async function getCurrentUser(): Promise<ApiResponse<ApiUser>> {
  return api.get<ApiUser>(`${AUTH_BASE}/me`);
}

/**
 * Refresh auth token
 * POST /api/v1/auth/refresh
 */
export async function refreshToken(): Promise<ApiResponse<{ token: string; expiresAt: string }>> {
  return api.post<{ token: string; expiresAt: string }>(`${AUTH_BASE}/refresh`);
}

/**
 * Request password reset
 * POST /api/v1/auth/forgot-password
 */
export async function forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
  return api.post<{ message: string }>(`${AUTH_BASE}/forgot-password`, { email });
}

/**
 * Reset password with token
 * POST /api/v1/auth/reset-password
 */
export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
  return api.post<{ message: string }>(`${AUTH_BASE}/reset-password`, { token, newPassword });
}

/**
 * Verify email with token
 * POST /api/v1/auth/verify-email
 */
export async function verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
  return api.post<{ message: string }>(`${AUTH_BASE}/verify-email`, { token });
}
