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
      className="group block p-4 md:p-6 bg-background rounded-lg border border-border text-center card-hover"
    >
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-1">{category.courseCount} courses</p>
    </Link>
  );
}
