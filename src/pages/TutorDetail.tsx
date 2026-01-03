import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Users, BookOpen, Award, Play, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tutors, courses, tutorReviews } from '@/data/mockData';

const TutorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tutor = tutors.find(t => t.id === id);
  const tutorCourses = courses.filter(c => c.tutor.id === id);
  const reviews = tutorReviews.filter(r => r.tutorId === id);

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Tutor not found</h1>
          <Button asChild className="mt-4">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4 sm:mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-primary/20 shadow-xl"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Badge className="badge-primary flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{tutor.name}</h1>
              <p className="text-primary text-base sm:text-lg mt-1">{tutor.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{tutor.experience}</p>

              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="text-xl sm:text-2xl font-bold">{tutor.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-xl sm:text-2xl font-bold">{(tutor.studentCount / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-xl sm:text-2xl font-bold">{tutor.courseCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4 sm:mt-6">
                {tutor.specialties.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs sm:text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-8 sm:py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">About {tutor.name.split(' ')[0]}</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {tutor.bio}
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
            Courses by {tutor.name.split(' ')[0]} ({tutorCourses.length})
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tutorCourses.map((course, index) => (
              <div 
                key={course.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {tutorCourses.length === 0 && (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No courses available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-8 sm:py-12 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
            Student Reviews ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl">
              {reviews.map((review, index) => (
                <div 
                  key={review.id}
                  className="bg-gradient-card rounded-xl border border-border p-4 sm:p-6 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{review.userName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-background rounded-2xl border border-border max-w-2xl">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reviews yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TutorDetail;
