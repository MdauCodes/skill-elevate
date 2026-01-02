import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Users, Eye, Clock, ChevronRight, Building2, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { jobs, mockApplications, Job, JobApplication } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [businessUser, setBusinessUser] = useState<any>(null);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('mwanzo_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== 'business') {
        navigate('/');
        return;
      }
      setBusinessUser(user);
      
      // Get jobs posted by this business (mock: show first 3 jobs)
      setPostedJobs(jobs.slice(0, 3));
      
      // Get applications for these jobs
      setApplications(mockApplications);
    } else {
      navigate('/business/register');
    }
  }, [navigate]);

  if (!businessUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      icon: Briefcase,
      label: 'Active Jobs',
      value: postedJobs.length,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Users,
      label: 'Total Applicants',
      value: applications.length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Eye,
      label: 'Profile Views',
      value: 156,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Clock,
      label: 'Pending Review',
      value: applications.filter(a => a.status === 'pending').length,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const getStatusBadge = (status: JobApplication['status']) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500',
      reviewed: 'bg-blue-500/10 text-blue-500',
      shortlisted: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    };
    return styles[status];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{businessUser.companyName || 'Your Company'}</h1>
                <p className="text-muted-foreground">Business Dashboard</p>
              </div>
            </div>
            <Button asChild className="btn-primary">
              <Link to="/business/post-job">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Posted Jobs */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">Your Job Postings</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/business/jobs">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="divide-y divide-border">
                {postedJobs.length === 0 ? (
                  <div className="p-8 text-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No jobs posted yet</p>
                    <Button asChild className="btn-primary">
                      <Link to="/business/post-job">Post Your First Job</Link>
                    </Button>
                  </div>
                ) : (
                  postedJobs.map((job) => {
                    const jobApplications = applications.filter(a => a.jobId === job.id);
                    return (
                      <div key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <Link to={`/jobs/${job.id}`} className="font-medium hover:text-primary transition-colors">
                              {job.title}
                            </Link>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.type}</span>
                              <span>•</span>
                              <span>{job.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-sm text-primary font-medium">
                                {jobApplications.length} applicant{jobApplications.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="flex-shrink-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/business/jobs/${job.id}/applicants`}>
                                  <Users className="w-4 h-4 mr-2" />
                                  View Applicants
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Job
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">Recent Applications</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/business/applications">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="divide-y divide-border">
                {applications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No applications yet</p>
                  </div>
                ) : (
                  applications.slice(0, 5).map((application) => {
                    const job = jobs.find(j => j.id === application.jobId);
                    return (
                      <div key={application.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <img
                            src={application.applicantAvatar}
                            alt={application.applicantName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{application.applicantName}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              Applied for: {job?.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(application.status)}`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                              <span className="text-xs text-muted-foreground">{application.appliedDate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/business/applications/${application.id}`}>
                              Review
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <h3 className="font-semibold mb-2">💡 Tip: Attract More Applicants</h3>
            <p className="text-muted-foreground text-sm">
              Jobs with clear salary ranges and detailed skill requirements get 3x more applications. 
              Make sure your job postings are detailed and specific about what you're looking for.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
