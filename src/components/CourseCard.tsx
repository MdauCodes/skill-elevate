import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '@/data/mockData';

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

  const discountPercent = course.originalPrice 
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0;

  if (variant === 'compact') {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="group block bg-background rounded-md border border-border overflow-hidden card-hover"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Color overlay + blur to soften AI look */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-primary/15 to-foreground/10 backdrop-blur-[0.5px]" />
          {/* Category Label */}
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-background/90 backdrop-blur-sm rounded text-[9px] font-semibold text-foreground uppercase tracking-wide">
            {course.category.name}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{course.tutor.name}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-sm font-bold text-warning">{course.rating}</span>
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
          </div>
          <p className="text-base font-bold text-foreground mt-1.5">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className="group flex gap-4 bg-background rounded-md border border-border overflow-hidden card-hover p-3"
      >
        <div className="relative w-32 h-20 sm:w-40 sm:h-24 flex-shrink-0 rounded overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Color overlay + blur to soften AI look */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-primary/15 to-foreground/10 backdrop-blur-[0.5px]" />
          {/* Category Label */}
          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-background/90 backdrop-blur-sm rounded text-[8px] font-semibold text-foreground uppercase tracking-wide">
            {course.category.name}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{course.tutor.name}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-sm font-bold text-warning">{course.rating}</span>
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
          </div>
          <p className="text-base font-bold text-foreground mt-1">{formatPrice(course.price)}</p>
        </div>
      </Link>
    );
  }

  // Default Udemy-style card
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block bg-background border border-border overflow-hidden card-hover"
    >
      {/* Thumbnail with category label */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Color overlay + blur to soften AI look */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-primary/15 to-foreground/10 backdrop-blur-[0.5px]" />
        {/* Category Label - makes images look less AI */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded text-[10px] font-semibold text-foreground uppercase tracking-wide shadow-sm">
          {course.category.name}
        </div>
        {/* Hover Preview Overlay */}
        <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-background font-medium text-sm">Preview</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title - 2 lines max */}
        <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        {/* Instructor */}
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {course.tutor.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-sm font-bold text-warning">{course.rating}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-3 h-3 ${
                  star <= Math.floor(course.rating) 
                    ? 'fill-warning text-warning' 
                    : 'fill-muted text-muted'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
        </div>

        {/* Duration and Lectures */}
        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.lessonsCount} lectures</span>
          <span>•</span>
          <span>{course.level}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-foreground">{formatPrice(course.price)}</span>
          {course.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            </>
          )}
        </div>

        {/* Badges */}
        <div className="flex gap-1 mt-2">
          {course.isTrending && (
            <span className="badge-bestseller">Bestseller</span>
          )}
          {course.isFeatured && !course.isTrending && (
            <span className="badge-new">Hot & New</span>
          )}
        </div>
      </div>
    </Link>
  );
}
