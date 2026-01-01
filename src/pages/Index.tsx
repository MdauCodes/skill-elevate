import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, BookOpen, Briefcase, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { CategoryCard } from '@/components/CategoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { JobCard } from '@/components/JobCard';
import { StatsSection } from '@/components/StatsSection';
import { AutoScrollCarousel } from '@/components/AutoScrollCarousel';
import { courses, categories, testimonials, jobs } from '@/data/mockData';

const howItWorks = [
  {
    icon: BookOpen,
    title: 'Browse & Enroll',
    description: 'Explore our curated courses in digital marketing, AI, web development, and more. Enroll instantly with M-Pesa.',
  },
  {
    icon: Award,
    title: 'Learn & Get Certified',
    description: 'Complete interactive video lessons at your own pace. Earn verified certificates recognized by top employers.',
  },
  {
    icon: Briefcase,
    title: 'Land Your Dream Job',
    description: 'Access exclusive job opportunities that match your new skills. We connect you directly with employers.',
  },
];

const Index = () => {
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 8);
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-glow opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-glow opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Trusted by 15,000+ Kenyans</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight animate-fade-up delay-100">
              You Learn a Skill,
              <br />
              <span className="text-gradient">We Connect You to a Job</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto animate-fade-up delay-200">
              Master in-demand skills in digital marketing, AI, and web development. 
              Get certified and access exclusive job opportunities from top Kenyan companies.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up delay-300">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-6 shadow-glow">
                <Link to="/courses">
                  Browse Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-border hover:bg-muted">
                <Link to="/jobs">
                  <Briefcase className="w-5 h-5 mr-2" />
                  View Job Openings
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12 animate-fade-up delay-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Verified Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">M-Pesa Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Courses Carousel */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Trending Courses</h2>
              <p className="text-muted-foreground mt-2">Master the skills employers are actively hiring for</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/courses">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Auto-scrolling carousel */}
        <AutoScrollCarousel className="px-4">
          {featuredCourses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-[340px]">
              <CourseCard course={course} />
            </div>
          ))}
        </AutoScrollCarousel>

        <div className="container mx-auto px-4 mt-8 md:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/courses">
              View All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground mt-2">Find courses that match your career goals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How Elevato Works</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              From learning to landing your dream job in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div 
                key={step.title} 
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-primary/20" />
                )}
                
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground mt-2">See how Elevato transformed careers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Opportunities Teaser */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Fresh Job Opportunities</h2>
              <p className="text-muted-foreground mt-2">Available exclusively to Elevato graduates</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* For Students */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-8 md:p-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of Kenyans who are building their future with in-demand skills.
                </p>
                <Button asChild className="btn-primary">
                  <Link to="/courses">
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* For Businesses */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-8 md:p-10">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-turquoise/5 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Hiring Skilled Talent?</h3>
                <p className="text-muted-foreground mb-6">
                  Access our pool of verified, skilled graduates ready to contribute from day one.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/jobs">
                    Post a Job
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
