import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Clock,
  Building,
  Lock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Share2,
  Bookmark,
  ExternalLink,
  Upload,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { jobs, courses } from '@/data/mockData';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, hasCompleted } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Button asChild>
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check qualification
  const requiredCourseDetails = job.requiredCourses.map(courseId => {
    const course = courses.find(c => c.id === courseId);
    return {
      id: courseId,
      title: course?.title || 'Unknown Course',
      slug: course?.slug || '',
      completed: hasCompleted(courseId),
    };
  });

  const isQualified = requiredCourseDetails.every(c => c.completed);
  const relatedJobs = jobs.filter(j => j.id !== job.id).slice(0, 3);

  const typeColors: Record<string, string> = {
    'Full-time': 'bg-success/20 text-success',
    'Part-time': 'bg-turquoise/20 text-turquoise',
    'Contract': 'bg-warning/20 text-warning',
    'Freelance': 'bg-primary/20 text-primary',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to apply for jobs',
      });
      navigate('/login');
      return;
    }

    if (!isQualified) {
      toast({
        title: 'Not qualified',
        description: 'Please complete the required courses first',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    toast({
      title: '🎉 Application Submitted!',
      description: `Your application for ${job.title} at ${job.company} has been sent. The employer will contact you soon.`,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                        <p className="text-lg text-primary mt-1">{job.company}</p>
                      </div>
                      <Badge className={typeColors[job.type]}>{job.type}</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
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
                        Posted {job.postedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>

                <h3 className="text-lg font-semibold mt-8 mb-4">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mt-8 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Required Skills & Courses</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requiredSkills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>

                <h3 className="font-semibold mb-4">Required Courses</h3>
                <div className="space-y-3">
                  {requiredCourseDetails.map(course => (
                    <div
                      key={course.id}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        course.completed ? 'bg-success/10' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {course.completed ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className={course.completed ? '' : 'text-muted-foreground'}>
                          {course.title}
                        </span>
                      </div>
                      {!course.completed && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/courses/${course.slug}`}>
                            Enroll Now
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Apply for this Position</h2>

                {!isQualified ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Application Locked</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Complete the required courses above to unlock this job application and prove your skills to the employer.
                    </p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="resume">Resume/CV</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="resume"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </span>
                          <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                      <Textarea
                        id="cover-letter"
                        placeholder="Tell the employer why you're a great fit for this role..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="mt-2 min-h-[150px]"
                      />
                    </div>

                    <Button type="submit" className="w-full btn-primary h-12" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">About the Company</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Building className="w-4 h-4 mr-2" />
                  View Company Profile
                </Button>
              </div>

              {/* Similar Jobs */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {relatedJobs.map(j => (
                    <JobCard key={j.id} job={j} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
