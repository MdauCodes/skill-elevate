// Backend API Types - Aligned with Spring Boot entities

// ============== Enums ==============

export type VideoProcessingStatus = 'UPLOADED' | 'PROCESSING' | 'READY' | 'FAILED';

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type CourseStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'EMPLOYER' | 'ADMIN';

// ============== User ==============

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============== Category ==============

export interface ApiCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  courseCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============== Course ==============

export interface ApiCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  category?: ApiCategory;
  instructorId: string;
  instructor?: ApiInstructor;
  price: number;
  originalPrice?: number;
  level: CourseLevel;
  status: CourseStatus;
  enrollmentCount: number;
  averageRating: number;
  reviewCount: number;
  isPublished: boolean;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  duration: string;
  lessonsCount: number;
  whatYouLearn: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

// ============== Section (Course Module) ==============

export interface ApiSection {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  displayOrder: number;
  totalDurationMinutes: number;
  videoCount: number;
  isPublished: boolean;
  videos?: ApiVideo[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionRequest {
  title: string;
  description?: string;
  displayOrder: number;
}

// ============== Video ==============

export interface ApiVideo {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description?: string;
  displayOrder: number;
  durationSeconds: number;
  videoUrl: string;
  streamingUrl?: string;
  thumbnailUrl?: string;
  quality?: string;
  fileSizeBytes?: number;
  isPreview: boolean;
  isPublished: boolean;
  processingStatus: VideoProcessingStatus;
  transcodingJobId?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoRequest {
  courseId: string;
  title: string;
  description?: string;
  displayOrder: number;
  durationSeconds: number;
  videoUrl: string;
  thumbnailUrl?: string;
  isPreview?: boolean;
}

// ============== Video Progress ==============

export interface ApiVideoProgress {
  id: string;
  studentId: string;
  enrollmentId: string;
  videoId: string;
  courseId: string;
  sectionId: string;
  watchedSeconds: number;
  lastPositionSeconds: number;
  progressPercentage: number;
  isCompleted: boolean;
  completedAt?: string;
  lastWatchedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProgressRequest {
  studentId: string;
  positionSeconds: number;
}

export interface VideoAccessResponse {
  hasAccess: boolean;
  reason?: string;
}

// ============== Enrollment ==============

export interface ApiEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedAt?: string;
  isCompleted: boolean;
  lastAccessedAt?: string;
}

// ============== Instructor ==============

export interface ApiInstructor {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  title: string;
  bio?: string;
  rating: number;
  studentCount: number;
  courseCount: number;
  specialties: string[];
  experience?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============== Auth ==============

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: ApiUser;
  expiresAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterResponse {
  user: ApiUser;
  message: string;
}

// ============== Payment ==============

export interface PaymentRequest {
  courseId: string;
  paymentMethod: 'MPESA' | 'CARD';
  phoneNumber?: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  checkoutRequestId?: string;
  message: string;
}
