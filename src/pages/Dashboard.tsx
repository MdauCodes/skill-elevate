import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Briefcase,
  Bell,
  Clock,
  TrendingUp,
  ArrowRight,
  PlayCircle,
  CheckCircle,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { courses, jobs } from '@/data/mockData';

export default function Dashboard() {
  const { user, isEnrolled, hasCompleted, getProgress } = useAuth();

  if (!user) {
    return null;
  }

  const enrolledCourses = courses.filter(c => isEnrolled(c.id));
  const completedCourses = courses.filter(c => hasCompleted(c.id));
  const qualifiedJobs = jobs.filter(job =>
    job.requiredCourses.every(courseId => hasCompleted(courseId))
  );
  const recommendedCourses = courses.filter(c => !isEnrolled(c.id)).slice(0, 4);

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Award,
      label: 'Completed',
      value: completedCourses.length,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Award,
      label: 'Certificates',
      value: user.certificates.length,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      icon: Briefcase,
      label: 'Jobs Available',
      value: qualifiedJobs.length,
      color: 'text-turquoise',
      bgColor: 'bg-turquoise/10',
    },
  ];

  const recentActivity = [
    { icon: PlayCircle, text: 'Started "Digital Marketing" course', time: '2 hours ago' },
    { icon: CheckCircle, text: 'Completed "Social Media Management" lesson', time: '1 day ago' },
    { icon: Award, text: 'Earned certificate for "Web Development"', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue your learning journey and track your progress
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl border border-border p-5 md:p-6 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Continue Learning</h2>
                  <Link to="/dashboard/courses" className="text-primary text-sm hover:underline">
                    View All
                  </Link>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No courses yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 3).map(course => {
                      const progress = getProgress(course.id);
                      return (
                        <div
                          key={course.id}
                          className="bg-card rounded-2xl border border-border p-4 md:p-6 card-hover"
                        >
                          <div className="flex gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-24 h-16 md:w-32 md:h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {course.tutor.name}
                              </p>
                              <div className="flex items-center gap-3 mt-3">
                                <Progress value={progress} className="flex-1 h-2" />
                                <span className="text-sm font-medium">{progress}%</span>
                              </div>
                            </div>
                            <Button asChild className="hidden md:flex" size="sm">
                              <Link to={`/learn/${course.id}`}>
                                Continue
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                          <Button asChild className="w-full mt-4 md:hidden" size="sm">
                            <Link to={`/learn/${course.id}`}>
                              Continue Learning
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Available Jobs */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Jobs You Qualify For</h2>
                    <p className="text-sm text-muted-foreground">
                      Based on your completed courses
                    </p>
                  </div>
                  <Link to="/jobs" className="text-primary text-sm hover:underline">
                    View All Jobs
                  </Link>
                </div>

                {qualifiedJobs.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No qualifying jobs yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete courses to unlock job opportunities
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/courses">Start Learning</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {qualifiedJobs.slice(0, 4).map(job => (
                      <JobCard key={job.id} job={job} variant="compact" />
                    ))}
                  </div>
                )}
              </section>

              {/* Recommended Courses */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Recommended For You</h2>
                    <p className="text-sm text-muted-foreground">
                      Courses to expand your skillset
                    </p>
                  </div>
                  <Link to="/courses" className="text-primary text-sm hover:underline">
                    View All
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {recommendedCourses.map(course => (
                    <CourseCard key={course.id} course={course} variant="compact" />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/jobs">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Find Jobs
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/dashboard/certificates">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificates
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Streak */}
              <div className="bg-gradient-to-br from-primary/20 to-turquoise/20 rounded-2xl border border-primary/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Learning Streak</h3>
                </div>
                <p className="text-4xl font-bold text-primary">7 days</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep going! You're doing great.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
