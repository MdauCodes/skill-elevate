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
        className="group flex items-center gap-3 p-3 rounded-lg bg-background border border-border card-hover"
      >
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {tutor.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{tutor.title}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="font-medium text-foreground">{tutor.rating}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-background rounded-lg border border-border overflow-hidden card-hover h-full">
      {/* Header with gradient */}
      <div className="relative h-16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-background shadow-md"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-5 px-4 text-center">
        <Link to={`/tutors/${tutor.id}`}>
          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
            {tutor.name}
          </h3>
        </Link>
        <p className="text-sm text-primary mt-0.5">{tutor.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{tutor.experience}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              <span className="font-bold text-sm text-foreground">{tutor.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold text-sm text-foreground">{(tutor.studentCount / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold text-sm text-foreground">{tutor.courseCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {tutor.specialties.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Button asChild variant="outline" size="sm" className="w-full mt-4">
          <Link to={`/tutors/${tutor.id}`}>
            View Courses
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
