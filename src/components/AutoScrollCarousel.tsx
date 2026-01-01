import { useRef, useEffect, useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutoScrollCarouselProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  showControls?: boolean;
  className?: string;
}

export function AutoScrollCarousel({
  children,
  speed = 30,
  pauseOnHover = true,
  showControls = true,
  className = '',
}: AutoScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let position = 0;

    const scroll = () => {
      if (isHovered && pauseOnHover) {
        animationId = requestAnimationFrame(scroll);
        return;
      }

      position += 0.5;
      
      // Reset position when we've scrolled halfway (for infinite effect)
      const scrollWidth = container.scrollWidth / 2;
      if (position >= scrollWidth) {
        position = 0;
      }
      
      container.scrollLeft = position;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, pauseOnHover, speed]);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scrollTo = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scroll controls */}
      {showControls && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollTo('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollTo('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Scrolling content */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Original items */}
        {children}
        {/* Duplicated items for infinite scroll effect */}
        {children}
      </div>
    </div>
  );
}
