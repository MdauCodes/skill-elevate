import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, CheckCircle, XCircle, Clock, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { jobs, mockApplications, courses, JobApplication } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function ViewApplicants() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const job = jobs.find(j => j.id === jobId);

  useEffect(() => {
    const storedUser = localStorage.getItem('mwanzo_user');
    if (!storedUser) {
      navigate('/business/register');
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role !== 'business') {
      navigate('/');
      return;
    }

    // Get applications for this job
    const jobApps = mockApplications.filter(a => a.jobId === jobId);
    setApplications(jobApps);
    if (jobApps.length > 0) {
      setSelectedApplication(jobApps[0]);
    }
  }, [jobId, navigate]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Job not found</p>
      </div>
    );
  }

  const updateStatus = (applicationId: string, status: JobApplication['status']) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === applicationId ? { ...app, status } : app
      )
    );
    if (selectedApplication?.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, status });
    }
    toast({
      title: 'Status Updated',
      description: `Application marked as ${status}.`,
    });
  };

  const getStatusBadge = (status: JobApplication['status']) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      reviewed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      shortlisted: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return styles[status];
  };

  const getStatusIcon = (status: JobApplication['status']) => {
    switch (status) {
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            to="/business"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Job Header */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span>{applications.length} applicant{applications.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-6">
                Applications will appear here once candidates apply for this position.
              </p>
              <Button asChild variant="outline">
                <Link to="/jobs">View Job Listing</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-1 bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold">All Applicants</h2>
                </div>
                <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                  {applications.map((application) => (
                    <button
                      key={application.id}
                      onClick={() => setSelectedApplication(application)}
                      className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                        selectedApplication?.id === application.id ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={application.applicantAvatar}
                          alt={application.applicantName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{application.applicantName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadge(application.status)}`}>
                              {application.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Detail */}
              {selectedApplication && (
                <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start gap-4">
                      <img
                        src={selectedApplication.applicantAvatar}
                        alt={selectedApplication.applicantName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{selectedApplication.applicantName}</h2>
                        <p className="text-muted-foreground">{selectedApplication.applicantEmail}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full border ${getStatusBadge(selectedApplication.status)}`}>
                            {getStatusIcon(selectedApplication.status)}
                            {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Applied {selectedApplication.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Completed Courses */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        Mwanzo Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.completedCourses.map((courseId) => {
                          const course = courses.find(c => c.id === courseId);
                          return course ? (
                            <span
                              key={courseId}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm"
                            >
                              <CheckCircle className="w-3 h-3" />
                              {course.title}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <h3 className="font-semibold mb-3">Cover Letter</h3>
                      <div className="p-4 rounded-xl bg-muted/50 text-sm leading-relaxed">
                        {selectedApplication.coverLetter}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <Button
                        onClick={() => {
                          toast({ title: 'Resume Download', description: 'Resume download started.' });
                        }}
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </Button>
                      <Button
                        onClick={() => {
                          window.location.href = `mailto:${selectedApplication.applicantEmail}`;
                        }}
                        variant="outline"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>

                    {/* Status Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <p className="w-full text-sm font-medium mb-2">Update Status:</p>
                      <Button
                        onClick={() => updateStatus(selectedApplication.id, 'reviewed')}
                        variant="outline"
                        size="sm"
                        className={selectedApplication.status === 'reviewed' ? 'border-blue-500' : ''}
                      >
                        Mark as Reviewed
                      </Button>
                      <Button
                        onClick={() => updateStatus(selectedApplication.id, 'shortlisted')}
                        variant="outline"
                        size="sm"
                        className={selectedApplication.status === 'shortlisted' ? 'border-green-500 text-green-500' : ''}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Shortlist
                      </Button>
                      <Button
                        onClick={() => updateStatus(selectedApplication.id, 'rejected')}
                        variant="outline"
                        size="sm"
                        className={selectedApplication.status === 'rejected' ? 'border-red-500 text-red-500' : ''}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
