import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen, Briefcase, Award, Users, Play, Verified, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { CategoryCard } from '@/components/CategoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { JobCard } from '@/components/JobCard';
import { TutorCard } from '@/components/TutorCard';
import { StatsSection } from '@/components/StatsSection';
import { AutoScrollCarousel } from '@/components/AutoScrollCarousel';
import { courses, categories, testimonials, jobs, tutors } from '@/data/mockData';

const howItWorks = [
  {
    icon: BookOpen,
    title: 'Learn a Skill',
    description: 'Enroll in industry-relevant courses taught by experienced Kenyan professionals. Learn at your own pace with video lessons.',
  },
  {
    icon: Award,
    title: 'Get Certified',
    description: 'Complete your course and earn a certificate recognized by top employers across Kenya and East Africa.',
  },
  {
    icon: Briefcase,
    title: 'Get a Job',
    description: 'Access exclusive job opportunities matched to your new skills. We connect you directly with hiring companies.',
  },
];

const Index = () => {
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 8);
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Mobile First, Conversion Focused */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-glow opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-glow opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 animate-fade-up">
              <Verified className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm text-primary font-medium">Trusted by 15,000+ Kenyans</span>
            </div>

            {/* Main Headline - Simple, Genuine */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up delay-100">
              You Learn a Skill,
              <br />
              <span className="text-gradient">We Connect You to a Job</span>
            </h1>

            {/* Simple Value Prop */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-xl mx-auto animate-fade-up delay-200">
              Master digital skills. Get certified. Land jobs at top Kenyan companies. It's that simple.
            </p>

            {/* CTAs - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-up delay-300">
              <Button asChild size="lg" className="btn-primary w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-glow">
                <Link to="/courses">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-border hover:bg-muted">
                <Link to="/jobs">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Link>
              </Button>
            </div>

            {/* Trust Proof - Compact for Mobile */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 animate-fade-up delay-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {tutors.slice(0, 3).map((tutor, i) => (
                    <img
                      key={tutor.id}
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-8 h-8 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Expert Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">M-Pesa Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lifetime Access</span>
              </div>
            </div>

            {/* Companies Hiring - Social Proof */}
            <div className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-border/50 animate-fade-up delay-500">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Our graduates work at:</p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60">
                <span className="text-base sm:text-lg font-bold text-foreground/70">Safaricom</span>
                <span className="text-base sm:text-lg font-bold text-foreground/70">Microsoft</span>
                <span className="text-base sm:text-lg font-bold text-foreground/70">Equity Bank</span>
                <span className="text-base sm:text-lg font-bold text-foreground/70">Kenya Airways</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works - Mobile First */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">How Mwanzo Works</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl mx-auto">
              From learning to landing your dream job in three simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div 
                key={step.title} 
                className="relative text-center p-6 rounded-2xl bg-gradient-card border border-border animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step number */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Trending Courses</h2>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Master the skills employers are actively hiring for</p>
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
            <div key={course.id} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px]">
              <CourseCard course={course} />
            </div>
          ))}
        </AutoScrollCarousel>

        <div className="container mx-auto px-4 mt-6 md:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/courses">
              View All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Find courses that match your career goals</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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

      {/* Meet Our Tutors - NEW SECTION */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm text-primary font-medium">Learn from the Best</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Meet Our Expert Tutors</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl mx-auto">
              Industry professionals from top Kenyan companies sharing real-world experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tutors.map((tutor, index) => (
              <div 
                key={tutor.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Real Kenyans, real results</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
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
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Fresh Job Opportunities</h2>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Available exclusively to Mwanzo graduates</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

          <div className="mt-6 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* For Students */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-6 sm:p-8 md:p-10">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Learning?</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
                  Join thousands of Kenyans building their future with in-demand skills.
                </p>
                <Button asChild className="btn-primary w-full sm:w-auto">
                  <Link to="/courses">
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* For Businesses */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-card border border-border p-6 sm:p-8 md:p-10">
              <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-turquoise/5 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Hiring Skilled Talent?</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
                  Access our pool of verified, skilled graduates ready to contribute from day one.
                </p>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/business/register">
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
