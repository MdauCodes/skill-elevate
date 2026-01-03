import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen, Briefcase, Award, Users, Play, Verified, GraduationCap, Star } from 'lucide-react';
import heroLearner1 from '@/assets/hero-learner-1.jpg';
import heroWorker1 from '@/assets/hero-worker-1.jpg';
import heroLearner2 from '@/assets/hero-learner-2.jpg';
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

// Hero success stories for carousel
const heroStories = [
  {
    image: heroLearner1,
    name: 'Wanjiku M.',
    quote: '"I learned from home and got hired!"',
    role: 'Now a UX Designer at Copia Kenya',
  },
  {
    image: heroWorker1,
    name: 'Brian K.',
    quote: '"From Form 4 to full-time developer!"',
    role: 'Now a Software Dev at Twiga Foods',
  },
  {
    image: heroLearner2,
    name: 'Amina O.',
    quote: '"3 job offers after completing my course!"',
    role: 'Now a Data Analyst at Sendy',
  },
];

const Index = () => {
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 8);
  const featuredJobs = jobs.slice(0, 3);
  const [activeStory, setActiveStory] = useState(0);

  // Auto-rotate hero stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % heroStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Compact with Side-by-Side Layout */}
      <section className="relative pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-glow opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          {/* Main Hero Grid - Side by Side on Large Screens */}
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-6 items-center">
            {/* Left: CTA Content - Takes more space */}
            <div className="lg:col-span-3 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-3 animate-fade-up">
                <Verified className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-medium">15,000+ Kenyans Trained</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight animate-fade-up delay-100">
                Learn Skills. <span className="text-gradient">Get Hired.</span>
              </h1>

              {/* Value Prop */}
              <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-md mx-auto lg:mx-0 animate-fade-up delay-200">
                For job seekers, form four leavers, and ambitious Kenyans ready to upskill and land jobs at growing companies.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2 sm:gap-3 mt-4 animate-fade-up delay-300">
                <Button asChild size="default" className="btn-primary w-full sm:w-auto text-sm px-5 py-3 shadow-glow">
                  <Link to="/courses">
                    Start Learning Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="default" className="w-full sm:w-auto text-sm px-5 py-3 border-border hover:bg-muted">
                  <Link to="/jobs">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
              </div>

              {/* Quick Stats - Inline */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 mt-3 sm:mt-4 animate-fade-up delay-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">M-Pesa</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">Job Placement</span>
                </div>
              </div>
            </div>

            {/* Right: Success Story Images - Compact Carousel */}
            <div className="lg:col-span-2 relative animate-fade-up delay-200">
              <div className="relative mx-auto max-w-xs lg:max-w-sm">
                {/* Main Featured Image */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border/30 h-[160px] sm:h-[180px] lg:h-[200px]">
                  {heroStories.map((story, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeStory ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    >
                      <img 
                        src={story.image} 
                        alt={`${story.name} - Mwanzo Skills Campus success story`}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent p-2.5 sm:p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{story.quote}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{story.name} — {story.role}</p>
                          </div>
                          <div className="flex gap-0.5 shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-2 h-2 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Story Indicators */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
                    {heroStories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStory(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ease-in-out ${
                          index === activeStory ? 'bg-primary w-4' : 'bg-foreground/30 hover:bg-foreground/50'
                        }`}
                        aria-label={`View story ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Live Counter Badge */}
                <div className="absolute -top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-medium shadow-md animate-pulse">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-primary-foreground rounded-full animate-ping" />
                    127 learning now
                  </span>
                </div>
              </div>

              {/* Mini Thumbnails - Desktop Only */}
              <div className="hidden lg:flex gap-2 mt-2 justify-center">
                {heroStories.map((story, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`relative rounded-lg overflow-hidden w-12 h-12 transition-all duration-300 ease-in-out ${
                      index === activeStory ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Companies Hiring - Compact */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center animate-fade-up delay-500">
            <p className="text-[10px] text-muted-foreground mb-2">Graduates hired at growing Kenyan SMEs:</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-60">
              <span className="text-xs font-medium text-foreground/70">Copia</span>
              <span className="text-xs font-medium text-foreground/70">Twiga Foods</span>
              <span className="text-xs font-medium text-foreground/70">Sendy</span>
              <span className="text-xs font-medium text-foreground/70">Ajira Digital</span>
              <span className="text-xs font-medium text-foreground/70">iPay</span>
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

      {/* Featured Courses - 3D Carousel */}
      <section className="py-10 sm:py-14 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Trending Courses</h2>
              <p className="text-muted-foreground mt-1 text-sm">Master skills employers are hiring for</p>
            </div>
            <Button variant="ghost" asChild size="sm" className="hidden md:flex">
              <Link to="/courses">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Smooth auto-scrolling carousel with pause on hover */}
        <AutoScrollCarousel className="px-4" speed={25} pauseOnHover={true}>
          {featuredCourses.map((course) => (
            <div 
              key={course.id} 
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </AutoScrollCarousel>

        <div className="container mx-auto px-4 mt-4 md:hidden">
          <Button variant="outline" asChild size="sm" className="w-full">
            <Link to="/courses">
              View All Courses
              <ArrowRight className="w-4 h-4 ml-1" />
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
