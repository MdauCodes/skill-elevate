import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/data/mockData';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
      {/* Quote icon */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg leading-relaxed mb-6 text-foreground/90">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-primary">{testimonial.jobTitle}</p>
          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>

      {/* Course completed badge */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Completed: <span className="text-foreground font-medium">{testimonial.courseCompleted}</span>
        </p>
      </div>
    </div>
  );
}
