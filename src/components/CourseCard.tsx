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
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 badge-primary text-[10px] sm:text-xs">
            {course.category.name}
          </Badge>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{course.tutor.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold text-gold" />
              <span className="text-xs sm:text-sm font-medium">{course.rating}</span>
            </div>
            <span className="text-muted-foreground text-xs sm:text-sm">({course.reviewCount})</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-primary mt-2">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="group flex gap-3 sm:gap-4 bg-gradient-card rounded-xl border border-border overflow-hidden card-hover p-3 sm:p-4"
      >
        <div className="relative w-28 h-20 sm:w-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{course.tutor.name}</p>
          <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold text-gold" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {course.duration}
            </span>
          </div>
          <p className="text-base sm:text-lg font-bold text-primary mt-1">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block bg-gradient-card rounded-xl sm:rounded-2xl border border-border overflow-hidden card-hover"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-2 left-2 sm:top-4 sm:left-4 badge-primary text-[10px] sm:text-xs">
          {course.category.name}
        </Badge>
        
        {/* Trending Badge */}
        {course.isTrending && (
          <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 badge-gold flex items-center gap-1 text-[10px] sm:text-xs">
            <TrendingUp className="w-3 h-3" />
            Trending
          </Badge>
        )}

        {/* Price (overlay) */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
          <div className="bg-primary text-primary-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-sm sm:text-base font-bold">
            {formatPrice(course.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        <h3 className="font-bold text-sm sm:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1.5 sm:mt-2 hidden sm:block">
          {course.shortDescription}
        </p>

        {/* Tutor */}
        <div className="flex items-center gap-2 mt-3 sm:mt-4">
          <img
            src={course.tutor.avatar}
            alt={course.tutor.name}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-primary/20"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">{course.tutor.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden sm:block">{course.tutor.title}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold text-gold" />
            <span className="text-xs sm:text-sm font-semibold">{course.rating}</span>
            <span className="text-muted-foreground text-[10px] sm:text-sm">({course.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">{course.duration}</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              {course.studentCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
