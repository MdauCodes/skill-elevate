// Video Content Service
// Connects to Spring Boot Video Controller endpoints

import { api, ApiResponse } from '@/lib/api';
import {
  ApiSection,
  ApiVideo,
  ApiVideoProgress,
  CreateSectionRequest,
  CreateVideoRequest,
  UpdateProgressRequest,
  VideoAccessResponse,
} from '@/types/api';

const VIDEO_BASE = '/videos';

// ============== Student Endpoints ==============

/**
 * Get course curriculum (all sections with video counts)
 * GET /api/v1/videos/courses/{courseId}/sections
 */
export async function getCourseSections(courseId: string): Promise<ApiResponse<ApiSection[]>> {
  return api.get<ApiSection[]>(`${VIDEO_BASE}/courses/${courseId}/sections`);
}

/**
 * Get all videos in a section
 * GET /api/v1/videos/sections/{sectionId}/videos
 */
export async function getSectionVideos(sectionId: string): Promise<ApiResponse<ApiVideo[]>> {
  return api.get<ApiVideo[]>(`${VIDEO_BASE}/sections/${sectionId}/videos`);
}

/**
 * Get video details for video player
 * GET /api/v1/videos/{videoId}
 */
export async function getVideo(videoId: string): Promise<ApiResponse<ApiVideo>> {
  return api.get<ApiVideo>(`${VIDEO_BASE}/${videoId}`);
}

/**
 * Check if student can watch video
 * GET /api/v1/videos/{videoId}/access?studentId={uuid}
 */
export async function checkVideoAccess(
  videoId: string,
  studentId: string
): Promise<ApiResponse<VideoAccessResponse>> {
  return api.get<VideoAccessResponse>(`${VIDEO_BASE}/${videoId}/access?studentId=${studentId}`);
}

/**
 * Update watch progress (call every 15 seconds during playback)
 * POST /api/v1/videos/{videoId}/progress
 */
export async function updateVideoProgress(
  videoId: string,
  data: UpdateProgressRequest
): Promise<ApiResponse<ApiVideoProgress>> {
  return api.post<ApiVideoProgress>(`${VIDEO_BASE}/${videoId}/progress`, data);
}

/**
 * Get student's progress for a video
 * GET /api/v1/videos/{videoId}/progress?studentId={uuid}
 */
export async function getVideoProgress(
  videoId: string,
  studentId: string
): Promise<ApiResponse<ApiVideoProgress>> {
  return api.get<ApiVideoProgress>(`${VIDEO_BASE}/${videoId}/progress?studentId=${studentId}`);
}

// ============== Instructor Endpoints ==============

/**
 * Create a new section in a course
 * POST /api/v1/videos/courses/{courseId}/sections
 */
export async function createSection(
  courseId: string,
  data: CreateSectionRequest
): Promise<ApiResponse<ApiSection>> {
  return api.post<ApiSection>(`${VIDEO_BASE}/courses/${courseId}/sections`, data);
}

/**
 * Create/upload a video in a section
 * POST /api/v1/videos/sections/{sectionId}/videos
 */
export async function createVideo(
  sectionId: string,
  data: CreateVideoRequest
): Promise<ApiResponse<ApiVideo>> {
  return api.post<ApiVideo>(`${VIDEO_BASE}/sections/${sectionId}/videos`, data);
}

/**
 * Update section details
 * PUT /api/v1/videos/sections/{sectionId}
 */
export async function updateSection(
  sectionId: string,
  data: Partial<CreateSectionRequest>
): Promise<ApiResponse<ApiSection>> {
  return api.put<ApiSection>(`${VIDEO_BASE}/sections/${sectionId}`, data);
}

/**
 * Update video details
 * PUT /api/v1/videos/{videoId}
 */
export async function updateVideo(
  videoId: string,
  data: Partial<CreateVideoRequest>
): Promise<ApiResponse<ApiVideo>> {
  return api.put<ApiVideo>(`${VIDEO_BASE}/${videoId}`, data);
}

/**
 * Delete a section
 * DELETE /api/v1/videos/sections/{sectionId}
 */
export async function deleteSection(sectionId: string): Promise<ApiResponse<void>> {
  return api.delete<void>(`${VIDEO_BASE}/sections/${sectionId}`);
}

/**
 * Delete a video
 * DELETE /api/v1/videos/{videoId}
 */
export async function deleteVideo(videoId: string): Promise<ApiResponse<void>> {
  return api.delete<void>(`${VIDEO_BASE}/${videoId}`);
}

// ============== Helper Functions ==============

/**
 * Format duration from seconds to human-readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate total section duration from videos
 */
export function calculateSectionDuration(videos: ApiVideo[]): string {
  const totalSeconds = videos.reduce((acc, video) => acc + video.durationSeconds, 0);
  return formatDuration(totalSeconds);
}

/**
 * Check if video is ready for playback
 */
export function isVideoReady(video: ApiVideo): boolean {
  return video.processingStatus === 'READY' && video.isPublished;
}

/**
 * Get appropriate video URL (streaming preferred)
 */
export function getVideoUrl(video: ApiVideo): string {
  return video.streamingUrl || video.videoUrl;
}
