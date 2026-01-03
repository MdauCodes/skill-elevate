/**
 * About Page Component
 * 
 * Displays information about Mwanzo Skills Campus, its mission, and team.
 * 
 * @backend API Endpoint: GET /api/v1/about
 * @backend Expected Response: { mission: string, vision: string, team: TeamMember[], stats: Stats }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target, Eye, Users, Award, BookOpen, Briefcase, Heart, ArrowRight } from 'lucide-react';

// Mock data - Replace with API call: GET /api/v1/about/team
const teamMembers = [
  {
    name: 'John Mwangi',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Former educator with 15+ years experience in skills training across Kenya.',
  },
  {
    name: 'Grace Atieno',
    role: 'Head of Curriculum',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face',
    bio: 'PhD in Education, specializing in vocational training and adult learning.',
  },
  {
    name: 'Peter Kamau',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Tech leader with background at Safaricom and Andela.',
  },
  {
    name: 'Fatima Hassan',
    role: 'Head of Partnerships',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=300&h=300&fit=crop&crop=face',
    bio: 'Connects graduates with employers across East Africa.',
  },
];

// Mock stats - Replace with API call: GET /api/v1/stats
const stats = [
  { icon: Users, value: '15,000+', label: 'Students Trained' },
  { icon: BookOpen, value: '50+', label: 'Courses Available' },
  { icon: Briefcase, value: '2,500+', label: 'Jobs Placed' },
  { icon: Award, value: '95%', label: 'Success Rate' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Mwanzo Skills Campus</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empowering Kenyans with practical skills for the modern job market. 
            From form four leavers to career changers, we're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-muted-foreground">
                To bridge the gap between education and employment in Kenya by providing 
                affordable, high-quality skills training that leads directly to job opportunities. 
                We believe every Kenyan deserves access to the skills needed for economic empowerment.
              </p>
            </div>
            
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-muted-foreground">
                A Kenya where unemployment is not a barrier to success. We envision a future 
                where every form four leaver, every job seeker, and every aspiring professional 
                has a clear pathway to meaningful employment through practical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: 'Student First', desc: 'Every decision we make prioritizes our students\' success and well-being.' },
              { icon: Award, title: 'Quality Education', desc: 'We partner with industry experts to deliver practical, job-ready skills.' },
              { icon: Users, title: 'Community', desc: 'We build a supportive community where learners help each other grow.' },
            ].map((value, index) => (
              <div 
                key={value.title}
                className="p-6 rounded-xl bg-gradient-card border border-border text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Passionate educators and tech leaders united by one goal: your success.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="p-6 rounded-xl bg-background border border-border text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join thousands of Kenyans who have transformed their careers through Mwanzo Skills Campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="btn-primary">
              <Link to="/courses">
                Browse Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
