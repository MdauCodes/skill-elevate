/**
 * Animated Course Carousel Component
 * 
 * A professional 3D-style carousel for displaying featured courses with smooth animations.
 * 
 * @backend This component receives course data from parent - no direct API calls
 * @see Course interface in /src/data/mockData.ts for data structure
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from './CourseCard';
import { Course } from '@/data/mockData';

interface AnimatedCourseCarouselProps {
  courses: Course[];
  title?: string;
  autoPlayInterval?: number;
}

export function AnimatedCourseCarousel({ 
  courses, 
  title = "Featured Courses",
  autoPlayInterval = 4000 
}: AnimatedCourseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCourses = 3; // Number of visible courses on desktop

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, courses.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  // Get visible courses with proper wrapping
  const getVisibleCourses = () => {
    const result = [];
    for (let i = 0; i < Math.min(visibleCourses, courses.length); i++) {
      const index = (currentIndex + i) % courses.length;
      result.push({ course: courses[index], position: i });
    }
    return result;
  };

  return (
    <div 
      className="relative py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={goToPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* 3D Carousel Effect */}
        <div className="flex justify-center items-center gap-4 px-4 min-h-[380px]">
          {getVisibleCourses().map(({ course, position }, index) => {
            // Calculate 3D-style positioning
            const isCenter = position === 1;
            const isLeft = position === 0;
            const isRight = position === 2;

            return (
              <div
                key={`${course.id}-${position}`}
                className={`
                  transition-all duration-500 ease-in-out transform
                  ${isCenter ? 'scale-100 z-20 opacity-100' : 'scale-90 z-10 opacity-70'}
                  ${isLeft ? '-translate-x-4' : ''}
                  ${isRight ? 'translate-x-4' : ''}
                  hidden md:block
                `}
                style={{
                  width: isCenter ? '340px' : '300px',
                  flexShrink: 0,
                }}
              >
                <CourseCard course={course} />
              </div>
            );
          })}

          {/* Mobile: Single Card View */}
          <div className="md:hidden w-full max-w-[320px]">
            <div
              key={courses[currentIndex]?.id}
              className="animate-fade-in transition-all duration-500 ease-in-out"
            >
              <CourseCard course={courses[currentIndex]} />
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {courses.slice(0, Math.min(8, courses.length)).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              transition-all duration-300 ease-in-out rounded-full
              ${currentIndex === index 
                ? 'bg-primary w-6 h-2' 
                : 'bg-muted-foreground/30 w-2 h-2 hover:bg-muted-foreground/50'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted overflow-hidden">
          <div 
            className="h-full bg-primary transition-all ease-linear"
            style={{
              width: '100%',
              animation: `shrink ${autoPlayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
