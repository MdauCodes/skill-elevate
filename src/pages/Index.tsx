import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Briefcase, Award, Star, Users, CheckCircle, TrendingUp, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { JobCard } from '@/components/JobCard';
import { TutorCard } from '@/components/TutorCard';
import { courses, categories, testimonials, jobs, tutors } from '@/data/mockData';

// Category tabs for filtering
const categoryTabs = ['All', 'Web Development', 'Digital Marketing', 'AI & Machine Learning', 'Graphic Design', 'Business'];

// How it works steps
const howItWorks = [
  {
    icon: BookOpen,
    title: 'Learn a Skill',
    description: 'Enroll in courses taught by experienced Kenyan professionals',
  },
  {
    icon: Award,
    title: 'Get Certified',
    description: 'Earn certificates recognized by top employers across Kenya',
  },
  {
    icon: Briefcase,
    title: 'Get a Job',
    description: 'Access exclusive job opportunities matched to your new skills',
  },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter courses based on category
  const filteredCourses = activeCategory === 'All' 
    ? courses.slice(0, 8)
    : courses.filter(c => c.category.name === activeCategory || c.category.name.includes(activeCategory.split(' ')[0])).slice(0, 8);

  const displayedCourses = filteredCourses.length > 0 ? filteredCourses : courses.slice(0, 8);
  const featuredJobs = jobs.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 1. Hero Section - Clean with prominent search */}
      <section className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Learn In-Demand Skills.{' '}
              <span className="text-primary">Get Hired in Kenya.</span>
            </h1>

            <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-xl mx-auto">
              Join 15,000+ Kenyans learning practical skills and landing jobs at top companies.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-6 md:mt-8">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="w-full pl-12 pr-32 py-4 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                />
                <Button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.slice(0, 5).map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/courses?category=${cat.slug}`}
                  className="category-pill text-xs md:text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>15,000+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span>4.8 average rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-success" />
                <span>Job Placement Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured/Popular Courses - IMMEDIATELY after hero */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Most Popular Courses</h2>
            <Button variant="ghost" asChild className="hidden md:flex text-primary hover:text-primary/80">
              <Link to="/courses">
                View All Courses
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === tab
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Courses Grid - 4 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-6 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/courses">
                View All Courses
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Browse by Categories */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Top Categories</h2>
            <p className="text-muted-foreground mt-2">Find courses that match your career goals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/courses?category=${category.slug}`}
                className="group p-4 md:p-6 bg-background rounded-lg border border-border text-center card-hover animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{category.courseCount} courses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How Mwanzo Works</h2>
            <p className="text-muted-foreground mt-2">From learning to landing your dream job in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div 
                key={step.title} 
                className="relative text-center p-6 rounded-xl bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Job Opportunities - UNIQUE TO MWANZO */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">Exclusive to Mwanzo Graduates</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Fresh Job Opportunities</h2>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary hover:text-primary/80">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Success Stories / Testimonials */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Success Stories from Kenyans Like You</h2>
            <p className="text-muted-foreground mt-2">Real students, real results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
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

      {/* 7. Meet Our Tutors */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-medium">Learn from the Best</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Learn from Industry Experts</h2>
            <p className="text-muted-foreground mt-2">Industry professionals from top Kenyan companies</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* 8. Trust Signals / Stats */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-2xl p-8 md:p-12 text-background">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-up">
                <div className="text-3xl md:text-4xl font-bold">15,000+</div>
                <p className="text-background/70 mt-1 text-sm">Students Enrolled</p>
              </div>
              <div className="animate-fade-up delay-100">
                <div className="text-3xl md:text-4xl font-bold">500+</div>
                <p className="text-background/70 mt-1 text-sm">Course Completions</p>
              </div>
              <div className="animate-fade-up delay-200">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <p className="text-background/70 mt-1 text-sm">Hiring Partners</p>
              </div>
              <div className="animate-fade-up delay-300">
                <div className="text-3xl md:text-4xl font-bold">40%</div>
                <p className="text-background/70 mt-1 text-sm">Avg. Salary Increase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Dual CTA */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* For Learners */}
            <div className="bg-background rounded-xl p-6 md:p-8 border border-border text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Ready to Start Learning?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse our catalog of industry-relevant courses and start your journey today.
              </p>
              <Button asChild className="btn-accent w-full md:w-auto">
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* For Employers */}
            <div className="bg-background rounded-xl p-6 md:p-8 border border-border text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Hiring Skilled Talent?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connect with job-ready graduates trained in the skills you need.
              </p>
              <Button asChild variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/5">
                <Link to="/post-job">
                  Post a Job
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
