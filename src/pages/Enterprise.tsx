/**
 * Enterprise Page Component
 * 
 * B2B solutions for corporate training and talent acquisition.
 * 
 * @backend API Endpoint: POST /api/v1/enterprise/inquiry
 * @backend Request Body: { companyName: string, contactName: string, email: string, phone: string, employeeCount: string, message: string }
 * @backend Expected Response: { success: boolean, leadId: string }
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
import { Building2, Users, TrendingUp, Award, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: Users, title: 'Custom Training Programs', desc: 'Tailored courses for your team\'s specific needs' },
  { icon: TrendingUp, title: 'Skills Gap Analysis', desc: 'Identify and address skill gaps in your workforce' },
  { icon: Award, title: 'Progress Tracking', desc: 'Monitor team progress with detailed analytics' },
  { icon: Building2, title: 'Talent Pipeline', desc: 'Access to job-ready graduates for your hiring needs' },
];

const features = [
  'Dedicated account manager',
  'Custom learning paths',
  'Team performance dashboards',
  'Priority support',
  'Bulk enrollment discounts',
  'API integration for HR systems',
  'On-site training options',
  'Certificate customization',
];

const trustedBy = ['Safaricom', 'KCB Bank', 'Equity Bank', 'NCBA', 'Co-operative Bank', 'Kenya Airways'];

export default function Enterprise() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '',
    message: '',
  });

  /**
   * Handle enterprise inquiry form submission
   * @backend Replace with: POST /api/v1/enterprise/inquiry
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Thank you! Our enterprise team will contact you within 24 hours.');
    setFormData({ companyName: '', contactName: '', email: '', phone: '', employeeCount: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Enterprise Solutions</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Upskill Your <span className="text-gradient">Workforce</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Custom training solutions for Kenyan businesses. Build in-demand skills across 
              your organization with our enterprise platform.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-4">Trusted by leading Kenyan organizations</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustedBy.map((company) => (
              <span key={company} className="text-lg font-medium text-foreground/50">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Mwanzo Enterprise?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-xl bg-gradient-card border border-border text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Enterprise Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Started</h2>
              <p className="text-muted-foreground">Tell us about your training needs and we'll create a custom solution.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Your Company Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name</Label>
                  <Input
                    id="contactName"
                    placeholder="John Kamau"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.co.ke"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of Employees to Train</Label>
                <Select 
                  value={formData.employeeCount} 
                  onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-50">10 - 50</SelectItem>
                    <SelectItem value="51-200">51 - 200</SelectItem>
                    <SelectItem value="201-500">201 - 500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">What skills are you looking to develop?</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your training objectives..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Request a Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
