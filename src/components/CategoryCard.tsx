import { Link } from 'react-router-dom';
import { TrendingUp, Brain, Code, Share2, Palette, Video, LucideIcon } from 'lucide-react';
import { Category } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Brain,
  Code,
  Share2,
  Palette,
  Video,
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Code;

  return (
    <Link
      to={`/courses?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border p-6 card-hover"
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${category.color}`} 
      />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-foreground" />
      </div>

      {/* Content */}
      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {category.courseCount} courses
      </p>

      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
