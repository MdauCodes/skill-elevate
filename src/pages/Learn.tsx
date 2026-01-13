import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle, PlayCircle, Clock, FileText, Download, AlertCircle } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseCurriculum } from '@/hooks/useCourseCurriculum';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { checkVideoAccess, getVideoUrl, formatDuration } from '@/services/videoService';
import { courses, Course } from '@/data/mockData';

// Fallback sample videos for development
const SAMPLE_VIDEOS = [
  'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
  'https://cdn.pixabay.com/video/2019/06/19/24569-343001767_large.mp4',
  'https://cdn.pixabay.com/video/2020/02/12/32489-392015291_large.mp4',
  'https://cdn.pixabay.com/video/2020/07/30/45603-445912296_large.mp4',
];

export default function LearnPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isEnrolled, updateProgress, completeCourse } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  // Fetch curriculum from backend
  const { 
    sections, 
    allLessons, 
    isLoading: isCurriculumLoading, 
    error: curriculumError,
    totalLessons 
  } = useCourseCurriculum(courseId);

  // Fallback to mock data if API fails
  const mockCourse = courses.find(c => c.id === courseId);

  // Determine if using backend or mock data
  const useBackend = sections.length > 0;

  // Get current lesson
  const currentLesson = useBackend 
    ? allLessons[currentLessonIndex] 
    : null;

  const currentMockLesson = !useBackend && mockCourse
    ? (() => {
        const lessons: { lesson: typeof mockCourse.curriculum[0]['lessons'][0]; sectionTitle: string }[] = [];
        mockCourse.curriculum.forEach(section => {
          section.lessons.forEach(lesson => {
            lessons.push({ lesson, sectionTitle: section.title });
          });
        });
        return lessons[currentLessonIndex];
      })()
    : null;

  // Video progress hook (only when using backend)
  const videoProgress = useVideoProgress({
    videoId: currentLesson?.video.id || '',
    studentId: user?.id || '',
    onComplete: () => {
      if (currentLesson) {
        handleLessonComplete();
      }
    },
  });

  // Check access for current video
  useEffect(() => {
    const checkAccess = async () => {
      if (!currentLesson || !user?.id) return;

      // Preview videos are always accessible
      if (currentLesson.video.isPreview) {
        setHasAccess(true);
        setAccessError(null);
        return;
      }

      const response = await checkVideoAccess(currentLesson.video.id, user.id);
      
      if (response.success && response.data) {
        setHasAccess(response.data.hasAccess);
        setAccessError(response.data.hasAccess ? null : response.data.reason || 'Access denied');
      } else {
        // Default to allowing access if check fails (graceful degradation)
        setHasAccess(true);
      }
    };

    checkAccess();
  }, [currentLesson, user?.id]);

  // Redirect if not authenticated or enrolled
  useEffect(() => {
    if (!courseId || (!mockCourse && !isCurriculumLoading && sections.length === 0)) {
      navigate('/courses');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isEnrolled(courseId)) {
      navigate(`/courses/${mockCourse?.slug || courseId}`);
      return;
    }
  }, [courseId, mockCourse, isAuthenticated, isEnrolled, navigate, isCurriculumLoading, sections.length]);

  // Calculate progress
  const lessonsCount = useBackend ? allLessons.length : (mockCourse?.curriculum.reduce((acc, s) => acc + s.lessons.length, 0) || 0);
  const progress = Math.round((completedLessons.length / lessonsCount) * 100);

  // Get video URL
  const getActiveVideoUrl = useCallback(() => {
    if (useBackend && currentLesson) {
      return getVideoUrl(currentLesson.video);
    }
    // Fallback to sample videos
    return SAMPLE_VIDEOS[currentLessonIndex % SAMPLE_VIDEOS.length];
  }, [useBackend, currentLesson, currentLessonIndex]);

  // Handle lesson completion
  const handleLessonComplete = () => {
    const lessonId = useBackend 
      ? currentLesson?.video.id 
      : currentMockLesson?.lesson.id;

    if (!lessonId || completedLessons.includes(lessonId)) return;

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);
    updateProgress(courseId!, lessonId);

    // Check if course is complete
    if (newCompleted.length === lessonsCount) {
      completeCourse(courseId!);
      toast({
        title: '🎉 Congratulations!',
        description: 'You have completed this course! Your certificate is ready.',
      });
    }
  };

  // Toggle lesson completion
  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
    } else {
      setCompletedLessons(prev => [...prev, lessonId]);
      updateProgress(courseId!, lessonId);
    }
  };

  // Navigation
  const goToNextLesson = () => {
    if (currentLessonIndex < lessonsCount - 1) {
      videoProgress.forceSync();
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      videoProgress.forceSync();
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  // Handle video time update for progress sync
  const handleTimeUpdate = useCallback((currentTime: number) => {
    if (useBackend) {
      videoProgress.updatePosition(Math.floor(currentTime));
    }
  }, [useBackend, videoProgress]);

  // Loading state
  if (isCurriculumLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // No course found
  if (!mockCourse && sections.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const courseTitle = mockCourse?.title || 'Course';
  const courseThumbnail = mockCourse?.thumbnail || '';
  const currentLessonTitle = useBackend 
    ? currentLesson?.video.title 
    : currentMockLesson?.lesson.title;
  const currentSectionTitle = useBackend 
    ? currentLesson?.sectionTitle 
    : currentMockLesson?.sectionTitle;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <Link to={`/courses/${mockCourse?.slug || courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Progress value={progress} className="w-32 h-2" />
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">My Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:mr-80' : ''}`}>
          {/* Video Player or Access Denied */}
          <div className="flex-shrink-0 bg-background">
            <div className="max-w-5xl mx-auto">
              {hasAccess ? (
                <VideoPlayer
                  src={getActiveVideoUrl()}
                  poster={courseThumbnail}
                  title={currentLessonTitle || ''}
                  onComplete={handleLessonComplete}
                  initialTime={useBackend ? videoProgress.resumePosition : 0}
                  onTimeUpdate={handleTimeUpdate}
                />
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
                    <p className="text-muted-foreground">{accessError || 'You do not have access to this video.'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Info */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-primary font-medium mb-1">{currentSectionTitle}</p>
                  <h1 className="text-2xl font-bold">{currentLessonTitle}</h1>
                  {useBackend && currentLesson && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Duration: {formatDuration(currentLesson.video.durationSeconds)}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mark-complete"
                    checked={completedLessons.includes(
                      useBackend ? currentLesson?.video.id || '' : currentMockLesson?.lesson.id || ''
                    )}
                    onCheckedChange={() => toggleLessonComplete(
                      useBackend ? currentLesson?.video.id || '' : currentMockLesson?.lesson.id || ''
                    )}
                  />
                  <label htmlFor="mark-complete" className="text-sm cursor-pointer">
                    Mark as complete
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between py-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goToPrevLesson}
                  disabled={currentLessonIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  {currentLessonIndex + 1} of {lessonsCount}
                </span>

                <Button
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === lessonsCount - 1}
                  className="btn-primary"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Resources */}
              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-4">Lesson Resources</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({ title: 'Download started', description: 'Your file is being downloaded.' });
                    }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Lesson Notes.pdf</span>
                    <Download className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({ title: 'Download started', description: 'Your file is being downloaded.' });
                    }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Exercises.zip</span>
                    <Download className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-16 right-0 bottom-0 w-80 bg-card border-l border-border overflow-y-auto transition-transform duration-300 z-40 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:hidden'
          }`}
        >
          {/* Course Progress */}
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold mb-2">{courseTitle}</h2>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {completedLessons.length} of {lessonsCount} complete
            </p>
          </div>

          {/* Curriculum */}
          <div className="divide-y divide-border">
            {useBackend ? (
              // Backend curriculum
              sections.map((section, sectionIndex) => (
                <div key={section.id}>
                  <div className="p-4 font-medium text-sm bg-muted/30">
                    {section.title}
                    <span className="text-muted-foreground ml-2">
                      ({section.videos?.length || 0} lessons)
                    </span>
                  </div>
                  <ul>
                    {(section.videos || []).map((video) => {
                      const globalIndex = allLessons.findIndex(l => l.video.id === video.id);
                      const isActive = globalIndex === currentLessonIndex;
                      const isCompleted = completedLessons.includes(video.id);

                      return (
                        <li key={video.id}>
                          <button
                            onClick={() => setCurrentLessonIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                              isActive ? 'bg-primary/10 border-l-2 border-primary' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : isActive ? (
                                <PlayCircle className="w-5 h-5 text-primary" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}>
                                {video.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <Clock className="w-3 h-3" />
                                {formatDuration(video.durationSeconds)}
                                {video.isPreview && (
                                  <span className="text-primary">Preview</span>
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              // Mock curriculum fallback
              mockCourse?.curriculum.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <div className="p-4 font-medium text-sm bg-muted/30">
                    {section.title}
                  </div>
                  <ul>
                    {section.lessons.map((lesson) => {
                      const globalIndex = (() => {
                        let idx = 0;
                        for (let i = 0; i < sectionIndex; i++) {
                          idx += mockCourse!.curriculum[i].lessons.length;
                        }
                        return idx + mockCourse!.curriculum[sectionIndex].lessons.findIndex(l => l.id === lesson.id);
                      })();
                      const isActive = globalIndex === currentLessonIndex;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setCurrentLessonIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                              isActive ? 'bg-primary/10 border-l-2 border-primary' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : isActive ? (
                                <PlayCircle className="w-5 h-5 text-primary" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
