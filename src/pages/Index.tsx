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
      
      {/* Hero Section - Humanized with Transitioning Success Stories */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-14 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-glow opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-gradient-glow opacity-15" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4 animate-fade-up">
                <Verified className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm text-primary font-medium">15,000+ Kenyans Trained</span>
              </div>

              {/* Main Headline - Genuine & Aspirational */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight animate-fade-up delay-100">
                Learn Skills.
                <br />
                <span className="text-gradient">Get Hired.</span>
              </h1>

              {/* Simple Value Prop - Targeting all audiences */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 max-w-lg mx-auto lg:mx-0 animate-fade-up delay-200">
                Whether you're a form four leaver, job seeker, or looking to upskill — learn digital skills and land jobs at growing Kenyan companies.
              </p>

              {/* CTAs - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2.5 sm:gap-3 mt-5 sm:mt-6 animate-fade-up delay-300">
                <Button asChild size="lg" className="btn-primary w-full sm:w-auto text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-5 shadow-glow">
                  <Link to="/courses">
                    Start Learning Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-5 border-border hover:bg-muted">
                  <Link to="/jobs">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-5 sm:mt-6 animate-fade-up delay-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">M-Pesa Payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Job Placement</span>
                </div>
              </div>
            </div>

            {/* Right: Success Story Images with Transitions */}
            <div className="relative order-1 lg:order-2 animate-fade-up delay-200">
              <div className="relative mx-auto max-w-sm lg:max-w-md">
                {/* Main Featured Image - Carousel with smooth transitions */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-border/30 h-[220px] sm:h-[260px] md:h-[300px]">
                  {heroStories.map((story, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeStory 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img 
                        src={story.image} 
                        alt={`${story.name} - Mwanzo Skills Campus success story`}
                        className="w-full h-full object-cover"
                      />
                      {/* Success Story Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-semibold text-foreground">{story.quote}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{story.name} — {story.role}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Story Indicators */}
                  <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {heroStories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStory(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                          index === activeStory 
                            ? 'bg-primary w-4 sm:w-6' 
                            : 'bg-foreground/30 hover:bg-foreground/50'
                        }`}
                        aria-label={`View story ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Mini Cards - Compact */}
                <div className="hidden md:block absolute -left-6 lg:-left-10 top-1/3 transform -translate-y-1/2">
                  <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2.5 shadow-lg animate-float">
                    <div className="flex items-center gap-2">
                      <img 
                        src={heroWorker1} 
                        alt="Success story" 
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium text-foreground">Brian K.</p>
                        <p className="text-xs text-primary">Just got hired! 🎉</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute -right-4 lg:-right-8 bottom-1/3">
                  <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2.5 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-2">
                      <img 
                        src={heroLearner2} 
                        alt="Success story" 
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium text-foreground">Amina O.</p>
                        <p className="text-xs text-primary">3 job offers! 🏆</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Counter Badge - Compact */}
                <div className="absolute -top-2 sm:-top-3 right-2 sm:right-4 bg-primary text-primary-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium shadow-md animate-pulse">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-ping" />
                    127 learning now
                  </span>
                </div>
              </div>

              {/* Mobile Success Stories Row - Compact */}
              <div className="flex gap-2 mt-3 md:hidden justify-center">
                {heroStories.slice(0, 2).map((story, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`bg-card border rounded-lg p-2 shadow flex items-center gap-2 transition-all duration-300 ${
                      index === activeStory ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={story.image} alt={story.name} className="w-8 h-8 rounded object-cover" />
                    <div className="text-left">
                      <p className="text-xs font-medium">{story.name.split(' ')[0]}</p>
                      <p className="text-xs text-primary">Hired! 🎉</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Companies Hiring - Smaller SMEs */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/30 text-center animate-fade-up delay-500">
            <p className="text-xs text-muted-foreground mb-3 sm:mb-4">Our graduates work at growing Kenyan companies:</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-70">
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">Copia Kenya</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">Twiga Foods</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">Sendy</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">Ajira Digital</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">Moringa School</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground/70">iPay Africa</span>
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
