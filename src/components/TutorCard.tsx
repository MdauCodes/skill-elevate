import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Tutor, courses, tutorReviews } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TutorCardProps {
  tutor: Tutor;
  variant?: 'default' | 'compact';
}

export function TutorCard({ tutor, variant = 'default' }: TutorCardProps) {
  const tutorCourses = courses.filter(c => c.tutor.id === tutor.id);
  const reviews = tutorReviews.filter(r => r.tutorId === tutor.id);
  
  if (variant === 'compact') {
    return (
      <Link
        to={`/tutors/${tutor.id}`}
        className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-card border border-border card-hover"
      >
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
            {tutor.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{tutor.title}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span className="font-medium">{tutor.rating}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-gradient-card rounded-2xl border border-border overflow-hidden card-hover">
      {/* Header with gradient */}
      <div className="relative h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-card shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 pb-5 px-5 text-center">
        <Link to={`/tutors/${tutor.id}`}>
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {tutor.name}
          </h3>
        </Link>
        <p className="text-sm text-primary mt-0.5">{tutor.title}</p>
        <p className="text-xs text-muted-foreground mt-1">{tutor.experience}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="font-bold">{tutor.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-bold">{(tutor.studentCount / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-bold">{tutor.courseCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {tutor.specialties.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {tutor.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tutor.specialties.length - 3}
            </Badge>
          )}
        </div>

        {/* Latest Review */}
        {reviews.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50 text-left">
            <p className="text-xs text-muted-foreground line-clamp-2 italic">
              "{reviews[0].comment}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">— {reviews[0].userName}</p>
          </div>
        )}

        {/* CTA */}
        <Button asChild variant="outline" className="w-full mt-4 group-hover:border-primary/50">
          <Link to={`/tutors/${tutor.id}`}>
            View Courses
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
