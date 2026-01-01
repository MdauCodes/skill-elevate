import { Link } from 'react-router-dom';

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
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Custom handcrafted logo mark */}
      <div className="relative">
        <svg
          viewBox="0 0 40 40"
          className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-14 h-14'} transition-transform duration-300 group-hover:scale-105`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background glow */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(174, 72%, 50%)" />
              <stop offset="100%" stopColor="hsl(186, 80%, 42%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main E shape with ascending stairs representing elevation */}
          <path
            d="M8 32 L8 8 L28 8 L28 12 L12 12 L12 18 L24 18 L24 22 L12 22 L12 28 L28 28 L28 32 L8 32"
            fill="url(#logoGradient)"
            filter="url(#glow)"
            className="transition-all duration-300"
          />
          
          {/* Arrow pointing up - represents elevation/growth */}
          <path
            d="M30 16 L34 8 L38 16 L35 16 L35 24 L33 24 L33 16 Z"
            fill="url(#logoGradient)"
            opacity="0.9"
          />
          
          {/* Subtle connecting line */}
          <path
            d="M28 12 L30 12"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>
      
      {/* Text */}
      <span className={`font-bold tracking-tight ${sizes[size]}`}>
        <span className="text-gradient">Elevato</span>
      </span>
    </Link>
  );
}
