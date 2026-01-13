// Hook for fetching course curriculum from backend
import { useState, useEffect, useMemo } from 'react';
import { getCourseSections, getSectionVideos, formatDuration } from '@/services/videoService';
import { ApiSection, ApiVideo } from '@/types/api';

interface FlattenedLesson {
  video: ApiVideo;
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  lessonIndexInSection: number;
  globalIndex: number;
}

interface UseCourseCurriculumResult {
  sections: ApiSection[];
  allLessons: FlattenedLesson[];
  isLoading: boolean;
  error: string | null;
  totalDuration: string;
  totalLessons: number;
  refetch: () => Promise<void>;
}

export function useCourseCurriculum(courseId: string | undefined): UseCourseCurriculumResult {
  const [sections, setSections] = useState<ApiSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurriculum = async () => {
    if (!courseId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all sections for the course
      const sectionsResponse = await getCourseSections(courseId);

      if (!sectionsResponse.success || !sectionsResponse.data) {
        setError(sectionsResponse.error?.message || 'Failed to load curriculum');
        setIsLoading(false);
        return;
      }

      const sectionsData = sectionsResponse.data;

      // Fetch videos for each section in parallel
      const sectionsWithVideos = await Promise.all(
        sectionsData.map(async (section) => {
          const videosResponse = await getSectionVideos(section.id);
          return {
            ...section,
            videos: videosResponse.success ? videosResponse.data || [] : [],
          };
        })
      );

      // Sort sections by display order
      sectionsWithVideos.sort((a, b) => a.displayOrder - b.displayOrder);

      // Sort videos within each section by display order
      sectionsWithVideos.forEach(section => {
        if (section.videos) {
          section.videos.sort((a, b) => a.displayOrder - b.displayOrder);
        }
      });

      setSections(sectionsWithVideos);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching curriculum:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, [courseId]);

  // Flatten all lessons for easy navigation
  const allLessons = useMemo(() => {
    const lessons: FlattenedLesson[] = [];
    let globalIndex = 0;

    sections.forEach((section, sectionIndex) => {
      (section.videos || []).forEach((video, lessonIndex) => {
        lessons.push({
          video,
          sectionId: section.id,
          sectionTitle: section.title,
          sectionIndex,
          lessonIndexInSection: lessonIndex,
          globalIndex: globalIndex++,
        });
      });
    });

    return lessons;
  }, [sections]);

  // Calculate total duration
  const totalDuration = useMemo(() => {
    const totalSeconds = allLessons.reduce(
      (acc, lesson) => acc + lesson.video.durationSeconds,
      0
    );
    return formatDuration(totalSeconds);
  }, [allLessons]);

  return {
    sections,
    allLessons,
    isLoading,
    error,
    totalDuration,
    totalLessons: allLessons.length,
    refetch: fetchCurriculum,
  };
}
