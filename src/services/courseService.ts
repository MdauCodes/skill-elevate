// Course Service
// Connects to Spring Boot Course Controller endpoints

import { api, ApiResponse } from '@/lib/api';
import { ApiCourse, ApiCategory, ApiEnrollment } from '@/types/api';

const COURSES_BASE = '/courses';
const CATEGORIES_BASE = '/categories';
const ENROLLMENTS_BASE = '/enrollments';

// ============== Course Endpoints ==============

/**
 * Get all published courses (with optional filters)
 * GET /api/v1/courses
 */
export async function getCourses(params?: {
  category?: string;
  level?: string;
  search?: string;
  page?: number;
  size?: number;
}): Promise<ApiResponse<{ content: ApiCourse[]; totalElements: number; totalPages: number }>> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.level) searchParams.append('level', params.level);
  if (params?.search) searchParams.append('search', params.search);
  if (params?.page !== undefined) searchParams.append('page', params.page.toString());
  if (params?.size) searchParams.append('size', params.size.toString());

  const query = searchParams.toString();
  return api.get<{ content: ApiCourse[]; totalElements: number; totalPages: number }>(
    `${COURSES_BASE}${query ? `?${query}` : ''}`
  );
}

/**
 * Get course by ID
 * GET /api/v1/courses/{id}
 */
export async function getCourse(courseId: string): Promise<ApiResponse<ApiCourse>> {
  return api.get<ApiCourse>(`${COURSES_BASE}/${courseId}`);
}

/**
 * Get course by slug
 * GET /api/v1/courses/slug/{slug}
 */
export async function getCourseBySlug(slug: string): Promise<ApiResponse<ApiCourse>> {
  return api.get<ApiCourse>(`${COURSES_BASE}/slug/${slug}`);
}

/**
 * Get featured courses
 * GET /api/v1/courses/featured
 */
export async function getFeaturedCourses(): Promise<ApiResponse<ApiCourse[]>> {
  return api.get<ApiCourse[]>(`${COURSES_BASE}/featured`);
}

/**
 * Get trending courses
 * GET /api/v1/courses/trending
 */
export async function getTrendingCourses(): Promise<ApiResponse<ApiCourse[]>> {
  return api.get<ApiCourse[]>(`${COURSES_BASE}/trending`);
}

// ============== Category Endpoints ==============

/**
 * Get all categories
 * GET /api/v1/categories
 */
export async function getCategories(): Promise<ApiResponse<ApiCategory[]>> {
  return api.get<ApiCategory[]>(CATEGORIES_BASE);
}

/**
 * Get category by ID
 * GET /api/v1/categories/{id}
 */
export async function getCategory(categoryId: string): Promise<ApiResponse<ApiCategory>> {
  return api.get<ApiCategory>(`${CATEGORIES_BASE}/${categoryId}`);
}

// ============== Enrollment Endpoints ==============

/**
 * Enroll in a course
 * POST /api/v1/enrollments
 */
export async function enrollInCourse(courseId: string): Promise<ApiResponse<ApiEnrollment>> {
  return api.post<ApiEnrollment>(ENROLLMENTS_BASE, { courseId });
}

/**
 * Get student enrollments
 * GET /api/v1/enrollments
 */
export async function getEnrollments(): Promise<ApiResponse<ApiEnrollment[]>> {
  return api.get<ApiEnrollment[]>(ENROLLMENTS_BASE);
}

/**
 * Get specific enrollment
 * GET /api/v1/enrollments/{enrollmentId}
 */
export async function getEnrollment(enrollmentId: string): Promise<ApiResponse<ApiEnrollment>> {
  return api.get<ApiEnrollment>(`${ENROLLMENTS_BASE}/${enrollmentId}`);
}

/**
 * Check if enrolled in a course
 * GET /api/v1/enrollments/course/{courseId}/check
 */
export async function checkEnrollment(courseId: string): Promise<ApiResponse<{ isEnrolled: boolean; enrollment?: ApiEnrollment }>> {
  return api.get<{ isEnrolled: boolean; enrollment?: ApiEnrollment }>(
    `${ENROLLMENTS_BASE}/course/${courseId}/check`
  );
}

/**
 * Get enrollment progress
 * GET /api/v1/enrollments/{enrollmentId}/progress
 */
export async function getEnrollmentProgress(enrollmentId: string): Promise<ApiResponse<{
  progressPercentage: number;
  completedVideos: number;
  totalVideos: number;
  lastAccessedAt: string;
}>> {
  return api.get(`${ENROLLMENTS_BASE}/${enrollmentId}/progress`);
}
