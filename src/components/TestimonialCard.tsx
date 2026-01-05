import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/data/mockData';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative bg-background rounded-lg border border-border p-5 md:p-6 h-full">
      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-warning text-warning" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-foreground mb-4">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-border"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-primary">{testimonial.jobTitle}</p>
          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>

      {/* Course completed badge */}
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Completed: <span className="text-foreground font-medium">{testimonial.courseCompleted}</span>
        </p>
      </div>
    </div>
  );
}
