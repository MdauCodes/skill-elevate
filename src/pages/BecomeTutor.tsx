/**
 * Become a Tutor Page Component
 * 
 * Application form and information for becoming a Mwanzo tutor.
 * 
 * @backend API Endpoint: POST /api/v1/tutor/apply
 * @backend Request Body: { 
 *   fullName: string, 
 *   email: string, 
 *   phone: string, 
 *   expertise: string, 
 *   experience: string, 
 *   linkedIn: string, 
 *   courseIdea: string,
 *   sampleVideoUrl: string 
 * }
 * @backend Expected Response: { success: boolean, applicationId: string }
 */

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  GraduationCap, DollarSign, Users, BarChart3, 
  CheckCircle, ArrowRight, Play 
} from 'lucide-react';

const benefits = [
  { icon: DollarSign, title: '70% Revenue Share', desc: 'Keep the majority of every course sale' },
  { icon: Users, title: 'Reach Thousands', desc: 'Access our growing student community' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track enrollments and earnings' },
  { icon: GraduationCap, title: 'Support & Resources', desc: 'Tools to create great courses' },
];

const requirements = [
  'Expertise in a marketable skill',
  'Ability to create video content',
  'Good communication skills',
  'Commitment to student success',
  'Available to respond to student questions',
];

const successStories = [
  { name: 'Janet W.', courses: 8, students: 12500, earnings: '2.5M+', specialty: 'Digital Marketing' },
  { name: 'Dr. Samuel O.', courses: 5, students: 8900, earnings: '1.8M+', specialty: 'AI & ML' },
  { name: 'Mary N.', courses: 12, students: 15600, earnings: '3.2M+', specialty: 'Web Development' },
];

export default function BecomeTutor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    linkedIn: '',
    courseIdea: '',
    sampleVideoUrl: '',
  });

  /**
   * Handle tutor application submission
   * @backend Replace with: POST /api/v1/tutor/apply
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Application submitted! We\'ll review and get back to you within 5 business days.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      expertise: '',
      experience: '',
      linkedIn: '',
      courseIdea: '',
      sampleVideoUrl: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Share Your Expertise</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Become a <span className="text-gradient">Mwanzo Tutor</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Turn your expertise into income. Teach thousands of Kenyans and build your personal brand.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Why Teach on Mwanzo?</h2>
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

      {/* Success Stories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Tutor Success Stories</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {successStories.map((tutor, index) => (
              <div 
                key={tutor.name}
                className="p-5 rounded-xl bg-gradient-card border border-border text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3">👨‍🏫</div>
                <h3 className="font-bold">{tutor.name}</h3>
                <p className="text-xs text-primary mb-3">{tutor.specialty}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-bold">{tutor.courses}</div>
                    <div className="text-[10px] text-muted-foreground">Courses</div>
                  </div>
                  <div>
                    <div className="font-bold">{tutor.students.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="font-bold text-primary">KES {tutor.earnings}</div>
                    <div className="text-[10px] text-muted-foreground">Earned</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What We're Looking For</h2>
              <div className="space-y-3 mb-8">
                {requirements.map((req) => (
                  <div key={req} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Sample Video Tip</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Record a 3-5 minute sample lesson teaching something from your expertise. 
                  This helps us evaluate your teaching style. You can use your smartphone!
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-background border border-border">
              <h2 className="text-xl font-bold mb-6">Apply to Teach</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Area of Expertise</Label>
                    <Select 
                      value={formData.expertise} 
                      onValueChange={(value) => setFormData({ ...formData, expertise: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="graphic-design">Graphic Design</SelectItem>
                        <SelectItem value="video-production">Video Production</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="business">Business & Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select 
                    value={formData.experience} 
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
                  <Input
                    id="linkedIn"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseIdea">Course Idea</Label>
                  <Textarea
                    id="courseIdea"
                    placeholder="Briefly describe the course you'd like to create..."
                    rows={3}
                    value={formData.courseIdea}
                    onChange={(e) => setFormData({ ...formData, courseIdea: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sampleVideoUrl">Sample Video Link (Optional)</Label>
                  <Input
                    id="sampleVideoUrl"
                    placeholder="YouTube or Google Drive link"
                    value={formData.sampleVideoUrl}
                    onChange={(e) => setFormData({ ...formData, sampleVideoUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    A 3-5 minute sample lesson showcasing your teaching style
                  </p>
                </div>

                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
