import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
            {/* Custom handcrafted logo mark - Abstract M shape with growth symbolism */}
            <div className="relative">
              <svg
                viewBox="0 0 44 44"
                className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-14 h-14'} transition-transform duration-300 group-hover:scale-105`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mwanzoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(174, 72%, 40%)" />
                    <stop offset="50%" stopColor="hsl(174, 72%, 50%)" />
                    <stop offset="100%" stopColor="hsl(186, 80%, 55%)" />
                  </linearGradient>
                  <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background circle with subtle gradient */}
                <circle cx="22" cy="22" r="20" fill="hsl(174, 72%, 50%)" opacity="0.1" />
                
                {/* Abstract M shape representing mountains/growth/beginnings */}
                <path
                  d="M10 32 L10 18 L22 10 L34 18 L34 32"
                  stroke="url(#mwanzoGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#logoGlow)"
                />
                
                {/* Center ascending arrow - symbolizing upward journey */}
                <path
                  d="M22 28 L22 16 M18 20 L22 16 L26 20"
                  stroke="url(#mwanzoGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                
                {/* Small accent dot - representing starting point */}
                <circle cx="22" cy="32" r="2" fill="url(#mwanzoGradient)" />
              </svg>
            </div>
            
            {/* Text - Full name on hover context */}
            <span className={`font-bold tracking-tight ${sizes[size]}`}>
              <span className="text-gradient">Mwanzo</span>
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-card border-border">
          <p className="text-sm font-medium">Go to Home — Mwanzo Skills Campus</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
