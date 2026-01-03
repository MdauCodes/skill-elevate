import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/data/mockData';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative bg-gradient-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8">
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 text-primary/20" />
      
      {/* Rating */}
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 text-foreground/90">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div>
          <p className="text-sm sm:text-base font-semibold">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-primary">{testimonial.jobTitle}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>

      {/* Course completed badge */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          Completed: <span className="text-foreground font-medium">{testimonial.courseCompleted}</span>
        </p>
      </div>
    </div>
  );
}
