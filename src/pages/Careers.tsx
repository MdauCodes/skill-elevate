/**
 * Careers Page Component
 * 
 * Displays job openings at Mwanzo Skills Campus.
 * 
 * @backend API Endpoint: GET /api/v1/careers
 * @backend Expected Response: { openings: JobOpening[] }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, ArrowRight, Heart, Zap, Users, Briefcase } from 'lucide-react';

// Mock data - Replace with API call: GET /api/v1/careers
const jobOpenings = [
  {
    id: '1',
    title: 'Curriculum Developer',
    department: 'Education',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Design and develop engaging course content for our growing catalog of skills training programs.',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote (Kenya)',
    type: 'Full-time',
    description: 'Build and maintain the Mwanzo platform using React, Node.js, and PostgreSQL.',
  },
  {
    id: '3',
    title: 'Student Success Manager',
    department: 'Operations',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Guide students through their learning journey and help them achieve their career goals.',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    department: 'Growth',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Drive awareness and enrollment through digital marketing campaigns across Kenya.',
  },
];

const benefits = [
  { icon: Heart, title: 'Health Coverage', desc: 'Comprehensive medical insurance for you and your family' },
  { icon: Zap, title: 'Learning Budget', desc: 'KES 100,000 annual budget for courses and conferences' },
  { icon: Users, title: 'Remote Flexibility', desc: 'Work from anywhere in Kenya with flexible hours' },
  { icon: Briefcase, title: 'Career Growth', desc: 'Clear paths for advancement and skill development' },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Join Our <span className="text-gradient">Mission</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Help us transform lives through skills training. We're building the future of 
            education in Kenya and we want you on our team.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Why Work at Mwanzo?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="p-5 rounded-xl bg-background border border-border text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Find your next opportunity and be part of something meaningful.
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {jobOpenings.map((job, index) => (
              <div 
                key={job.id}
                className="p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <Badge variant="secondary" className="text-xs">{job.department}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="shrink-0">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* No positions CTA */}
          <div className="mt-10 p-6 rounded-xl bg-gradient-card border border-border max-w-xl mx-auto text-center">
            <h3 className="font-bold mb-2">Don't see a fit?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're always looking for talented people. Send us your CV and we'll keep you in mind.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:careers@mwanzo.co.ke">Send Your CV</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
