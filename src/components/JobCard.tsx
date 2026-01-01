import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Lock, CheckCircle } from 'lucide-react';
import { Job } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact';
}

export function JobCard({ job, variant = 'default' }: JobCardProps) {
  const { hasCompleted } = useAuth();
  
  // Check if user has completed all required courses
  const isQualified = job.requiredCourses.every(courseId => hasCompleted(courseId));

  const typeColors: Record<string, string> = {
    'Full-time': 'bg-success/20 text-success',
    'Part-time': 'bg-turquoise/20 text-turquoise',
    'Contract': 'bg-warning/20 text-warning',
    'Freelance': 'bg-primary/20 text-primary',
  };

  if (variant === 'compact') {
    return (
      <Link
        to={`/jobs/${job.id}`}
        className="group flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-4 card-hover"
      >
        <img
          src={job.companyLogo}
          alt={job.company}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
              {job.title}
            </h4>
            {!isQualified && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <Badge className={typeColors[job.type]}>{job.type}</Badge>
      </Link>
    );
  }

  return (
    <Link
      to={`/jobs/${job.id}`}
      className={`group block bg-gradient-card rounded-2xl border border-border overflow-hidden card-hover ${
        !isQualified ? 'opacity-80' : ''
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              {!isQualified ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : (
                <CheckCircle className="w-4 h-4 text-success" />
              )}
            </div>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <Badge className={typeColors[job.type]}>{job.type}</Badge>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {job.postedDate}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {job.requiredSkills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Locked message */}
        {!isQualified && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Complete required courses to apply
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
