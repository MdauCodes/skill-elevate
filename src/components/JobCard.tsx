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
    'Full-time': 'bg-success/10 text-success border-success/20',
    'Part-time': 'bg-primary/10 text-primary border-primary/20',
    'Contract': 'bg-warning/10 text-warning border-warning/20',
    'Freelance': 'bg-accent/10 text-accent border-accent/20',
  };

  if (variant === 'compact') {
    return (
      <Link
        to={`/jobs/${job.id}`}
        className="group flex items-center gap-4 bg-background rounded-lg border border-border p-4 card-hover"
      >
        <img
          src={job.companyLogo}
          alt={job.company}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {job.title}
            </h4>
            {!isQualified && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <Badge className={`${typeColors[job.type]} border`}>{job.type}</Badge>
      </Link>
    );
  }

  return (
    <Link
      to={`/jobs/${job.id}`}
      className={`group block bg-background rounded-lg border border-border overflow-hidden card-hover ${
        !isQualified ? 'opacity-90' : ''
      }`}
    >
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 md:gap-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover border border-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              {!isQualified ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : (
                <CheckCircle className="w-4 h-4 text-success" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <Badge className={`${typeColors[job.type]} border text-xs`}>{job.type}</Badge>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
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
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.requiredSkills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
          {job.requiredSkills.length > 4 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{job.requiredSkills.length - 4}
            </Badge>
          )}
        </div>

        {/* Locked message */}
        {!isQualified && (
          <div className="mt-3 p-2.5 rounded-md bg-muted border border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Complete required courses to apply
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
