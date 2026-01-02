import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  thumbnail?: string;
}

export function YouTubePlayer({ videoId, title, thumbnail }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!isPlaying) {
    return (
      <div 
        className="relative w-full aspect-video bg-background rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={thumbnail || defaultThumbnail}
          alt={title || 'Video thumbnail'}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault doesn't exist
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 group-hover:bg-background/30 transition-colors">
          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-4 right-4 text-foreground/30 text-sm font-medium pointer-events-none">
          Mwanzo Kenya
        </div>

        {/* Title overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-background rounded-xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title || 'YouTube video'}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
