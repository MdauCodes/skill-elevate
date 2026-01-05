import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/" className={`flex items-center gap-2 group ${className}`}>
            {/* Logo Icon - Simple M badge */}
            <div className={`${iconSizes[size]} rounded-md bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}>
              <span className="text-primary-foreground font-bold text-base">M</span>
            </div>
            
            {/* Text */}
            <span className={`font-bold ${sizes[size]} text-foreground`}>
              Mwanzo
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-foreground text-background text-sm">
          <p>Go to Home — Mwanzo Skills Campus</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
