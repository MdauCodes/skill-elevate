/**
 * Tutor Resources Page Component
 * 
 * Resources and guides for Mwanzo tutors.
 * 
 * @backend API Endpoint: GET /api/v1/tutor/resources
 * @backend Expected Response: { resources: Resource[], guides: Guide[] }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Video, FileText, MessageCircle, TrendingUp, 
  Award, Download, Play, ArrowRight 
} from 'lucide-react';

// Mock data - Replace with API call: GET /api/v1/tutor/resources
const resources = [
  {
    icon: Video,
    title: 'Video Production Guide',
    desc: 'Learn how to record professional course videos with your smartphone',
    type: 'PDF Guide',
    downloadUrl: '#',
  },
  {
    icon: FileText,
    title: 'Course Outline Template',
    desc: 'Structured template for planning your course curriculum',
    type: 'Document',
    downloadUrl: '#',
  },
  {
    icon: BookOpen,
    title: 'Engagement Strategies',
    desc: 'Tips to keep students engaged and complete your courses',
    type: 'PDF Guide',
    downloadUrl: '#',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Your Course',
    desc: 'How to promote your course and increase enrollments',
    type: 'Video Series',
    downloadUrl: '#',
  },
];

const tutorials = [
  { title: 'Creating Your First Course', duration: '15 min', thumbnail: '🎬' },
  { title: 'Recording with Your Phone', duration: '12 min', thumbnail: '📱' },
  { title: 'Editing Videos for Free', duration: '20 min', thumbnail: '✂️' },
  { title: 'Writing Course Descriptions', duration: '8 min', thumbnail: '✍️' },
  { title: 'Setting the Right Price', duration: '10 min', thumbnail: '💰' },
  { title: 'Responding to Students', duration: '7 min', thumbnail: '💬' },
];

const stats = [
  { value: '70%', label: 'Revenue Share' },
  { value: 'KES 1,000', label: 'Minimum Payout' },
  { value: '15th', label: 'Monthly Payment' },
  { value: '24/7', label: 'Support Available' },
];

export default function TutorResources() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Tutor <span className="text-gradient">Resources</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to create successful courses and grow your teaching career on Mwanzo.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Downloadable Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {resources.map((resource, index) => (
              <div 
                key={resource.title}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.desc}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.downloadUrl}>
                        <Download className="w-4 h-4 mr-2" />
                        Download {resource.type}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Video Tutorials</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {tutorials.map((tutorial, index) => (
              <button
                key={tutorial.title}
                className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 text-left group animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-card flex items-center justify-center text-2xl">
                    {tutorial.thumbnail}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{tutorial.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {tutorial.duration}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Getting Started as a Tutor</h2>
          <div className="max-w-3xl mx-auto">
            {[
              { step: 1, title: 'Apply to Teach', desc: 'Submit your application with your expertise and sample content' },
              { step: 2, title: 'Get Approved', desc: 'Our team reviews your application within 3-5 business days' },
              { step: 3, title: 'Create Your Course', desc: 'Use our tools and resources to build engaging content' },
              { step: 4, title: 'Start Earning', desc: 'Launch your course and earn 70% of every sale' },
            ].map((item, index) => (
              <div 
                key={item.step}
                className="flex gap-4 pb-6 last:pb-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to Start Teaching?</h2>
            <p className="text-muted-foreground mb-6">
              Join hundreds of Kenyan experts sharing their knowledge on Mwanzo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-primary">
                <Link to="/become-tutor">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
