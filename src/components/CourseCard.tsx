import { Link } from 'react-router-dom';
import { Star, Clock, Users, TrendingUp } from 'lucide-react';
import { Course } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (variant === 'compact') {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="group block bg-gradient-card rounded-xl border border-border overflow-hidden card-hover"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-3 left-3 badge-primary">
            {course.category.name}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{course.tutor.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">({course.reviewCount})</span>
          </div>
          <p className="text-lg font-bold text-primary mt-2">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="group flex gap-4 bg-gradient-card rounded-xl border border-border overflow-hidden card-hover p-4"
      >
        <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{course.tutor.name}</p>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold text-gold" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
          </div>
          <p className="text-lg font-bold text-primary mt-1">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block bg-gradient-card rounded-2xl border border-border overflow-hidden card-hover"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 badge-primary">
          {course.category.name}
        </Badge>
        
        {/* Trending Badge */}
        {course.isTrending && (
          <Badge className="absolute top-4 right-4 badge-gold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </Badge>
        )}

        {/* Price (overlay) */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold">
            {formatPrice(course.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {course.shortDescription}
        </p>

        {/* Tutor */}
        <div className="flex items-center gap-2 mt-4">
          <img
            src={course.tutor.avatar}
            alt={course.tutor.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div>
            <p className="text-sm font-medium">{course.tutor.name}</p>
            <p className="text-xs text-muted-foreground">{course.tutor.title}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-muted-foreground text-sm">({course.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.studentCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
