import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Clock,
  Users,
  Award,
  PlayCircle,
  CheckCircle,
  Lock,
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
  Globe,
  Calendar,
  FileText,
  Download,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import { MpesaPaymentModal } from '@/components/MpesaPaymentModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { courses } from '@/data/mockData';

// Free sample video from Pixabay
const SAMPLE_VIDEO = 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isEnrolled, enrollInCourse, getProgress } = useAuth();
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  
  const course = courses.find(c => c.slug === slug);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course.id);
  const relatedCourses = courses
    .filter(c => c.category.id === course.category.id && c.id !== course.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to enroll in courses',
      });
      navigate('/login');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    enrollInCourse(course.id);
    toast({
      title: 'Enrollment successful!',
      description: 'You can now start learning. Good luck!',
    });
  };

  const handleStartLearning = () => {
    navigate(`/learn/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-2">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Link to="/courses" className="hover:text-primary">Courses</Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link to={`/courses?category=${course.category.slug}`} className="hover:text-primary">
                    {course.category.name}
                  </Link>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{course.shortDescription}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="badge-gold">Bestseller</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span className="text-muted-foreground">
                    {course.studentCount.toLocaleString()} students
                  </span>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={course.tutor.avatar}
                    alt={course.tutor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <Link to={`/tutors/${course.tutor.id}`} className="font-medium hover:text-primary">
                      {course.tutor.name}
                    </Link>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Last updated {course.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    English
                  </span>
                </div>
              </div>

              {/* Right - Video Preview (Desktop) */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elevated">
                    {/* Video Preview */}
                    {isPreviewPlaying ? (
                      <VideoPlayer
                        src={SAMPLE_VIDEO}
                        poster={course.thumbnail}
                        title="Course Preview"
                      />
                    ) : (
                      <div
                        className="relative aspect-video cursor-pointer group"
                        onClick={() => setIsPreviewPlaying(true)}
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/50 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-8 h-8 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          Preview this course
                        </div>
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="p-6">
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(course.originalPrice)}
                          </span>
                        )}
                      </div>

                      {enrolled ? (
                        <>
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Your progress</span>
                              <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          <Button onClick={handleStartLearning} className="w-full btn-primary h-12">
                            Continue Learning
                          </Button>
                        </>
                      ) : (
                        <Button onClick={handleEnroll} className="w-full btn-primary h-12">
                          Enroll Now
                        </Button>
                      )}

                      <p className="text-center text-sm text-muted-foreground mt-4">
                        30-Day Money-Back Guarantee
                      </p>

                      {/* Course includes */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-4">This course includes:</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            {course.duration} of video content
                          </li>
                          <li className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            {totalLessons} lessons
                          </li>
                          <li className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-muted-foreground" />
                            Downloadable resources
                          </li>
                          <li className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-muted-foreground" />
                            Certificate of completion
                          </li>
                        </ul>
                      </div>

                      {/* Share buttons */}
                      <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Heart className="w-4 h-4 mr-2" />
                          Wishlist
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Video & CTA */}
        <section className="lg:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            {isPreviewPlaying ? (
              <VideoPlayer
                src={SAMPLE_VIDEO}
                poster={course.thumbnail}
                title="Course Preview"
              />
            ) : (
              <div
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setIsPreviewPlaying(true)}
              >
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{formatPrice(course.price)}</span>
                {course.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
              {enrolled ? (
                <Button onClick={handleStartLearning} className="btn-primary">
                  Continue Learning
                </Button>
              ) : (
                <Button onClick={handleEnroll} className="btn-primary">
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Tabs defaultValue="overview">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 mb-8">
                  <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="curriculum" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  {/* What you'll learn */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Course Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <span className="font-medium">{course.curriculum.length} sections • {totalLessons} lessons • {course.duration}</span>
                    </div>
                    <Accordion type="multiple" className="divide-y divide-border">
                      {course.curriculum.map((section, sectionIndex) => (
                        <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`} className="border-0">
                          <AccordionTrigger className="px-4 py-4 hover:bg-muted/50 hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <span className="font-semibold">{section.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {section.lessons.length} lessons
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <ul className="divide-y divide-border">
                              {section.lessons.map((lesson) => (
                                <li key={lesson.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30">
                                  <div className="flex items-center gap-3">
                                    {lesson.isPreview || enrolled ? (
                                      <PlayCircle className="w-5 h-5 text-primary" />
                                    ) : (
                                      <Lock className="w-5 h-5 text-muted-foreground" />
                                    )}
                                    <span className={lesson.isPreview || enrolled ? '' : 'text-muted-foreground'}>
                                      {lesson.title}
                                    </span>
                                    {lesson.isPreview && !enrolled && (
                                      <Badge variant="outline" className="text-xs">Preview</Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="instructor">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-start gap-6">
                      <img
                        src={course.tutor.avatar}
                        alt={course.tutor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <Link to={`/tutors/${course.tutor.id}`} className="text-xl font-bold hover:text-primary">
                          {course.tutor.name}
                        </Link>
                        <p className="text-primary mt-1">{course.tutor.title}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-gold text-gold" />
                            {course.tutor.rating} Rating
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {course.tutor.studentCount.toLocaleString()} Students
                          </span>
                          <span className="flex items-center gap-1">
                            <PlayCircle className="w-4 h-4 text-muted-foreground" />
                            {course.tutor.courseCount} Courses
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground mt-4 leading-relaxed">{course.tutor.bio}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary">{course.rating}</div>
                        <div className="flex gap-0.5 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'fill-gold text-gold' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.reviewCount.toLocaleString()} reviews
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">
                      Reviews will be loaded from the database in the full version.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="py-12 bg-card border-t border-border">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCourses.map(c => (
                  <CourseCard key={c.id} course={c} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Payment Modal */}
      <MpesaPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        course={course}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
