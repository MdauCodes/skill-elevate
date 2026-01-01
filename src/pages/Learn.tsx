import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle, PlayCircle, Lock, FileText, Download, Clock } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { courses, Course, Lesson } from '@/data/mockData';

// Sample videos from Pixabay
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
  const { isAuthenticated, isEnrolled, updateProgress, getProgress, completeCourse } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const course = courses.find(c => c.id === courseId);
  
  useEffect(() => {
    if (!course || !isAuthenticated || !isEnrolled(course.id)) {
      navigate('/courses');
      return;
    }
    setIsLoading(false);
  }, [course, isAuthenticated, isEnrolled, navigate]);

  if (isLoading || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Flatten all lessons
  const allLessons: { lesson: Lesson; sectionTitle: string; sectionIndex: number }[] = [];
  course.curriculum.forEach((section, sectionIndex) => {
    section.lessons.forEach(lesson => {
      allLessons.push({ lesson, sectionTitle: section.title, sectionIndex });
    });
  });

  const currentLesson = allLessons[currentLessonIndex];
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson.lesson.id)) {
      const newCompleted = [...completedLessons, currentLesson.lesson.id];
      setCompletedLessons(newCompleted);
      updateProgress(course.id, currentLesson.lesson.id);
      
      // Check if course is complete
      if (newCompleted.length === allLessons.length) {
        completeCourse(course.id);
        toast({
          title: '🎉 Congratulations!',
          description: 'You have completed this course! Your certificate is ready.',
        });
      }
    }
  };

  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
    } else {
      setCompletedLessons(prev => [...prev, lessonId]);
      updateProgress(course.id, lessonId);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  // Get video URL (cycle through sample videos)
  const videoUrl = SAMPLE_VIDEOS[currentLessonIndex % SAMPLE_VIDEOS.length];

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
          
          <Link to={`/courses/${course.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
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
          {/* Video Player */}
          <div className="flex-shrink-0 bg-background">
            <div className="max-w-5xl mx-auto">
              <VideoPlayer
                src={videoUrl}
                poster={course.thumbnail}
                title={currentLesson.lesson.title}
                onComplete={handleLessonComplete}
              />
            </div>
          </div>

          {/* Lesson Info */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-primary font-medium mb-1">{currentLesson.sectionTitle}</p>
                  <h1 className="text-2xl font-bold">{currentLesson.lesson.title}</h1>
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mark-complete"
                    checked={completedLessons.includes(currentLesson.lesson.id)}
                    onCheckedChange={() => toggleLessonComplete(currentLesson.lesson.id)}
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
                  {currentLessonIndex + 1} of {allLessons.length}
                </span>

                <Button
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
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
            <h2 className="font-semibold mb-2">{course.title}</h2>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {completedLessons.length} of {allLessons.length} complete
            </p>
          </div>

          {/* Curriculum */}
          <div className="divide-y divide-border">
            {course.curriculum.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="p-4 font-medium text-sm bg-muted/30">
                  {section.title}
                </div>
                <ul>
                  {section.lessons.map((lesson, lessonIndex) => {
                    const globalIndex = allLessons.findIndex(l => l.lesson.id === lesson.id);
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
            ))}
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
