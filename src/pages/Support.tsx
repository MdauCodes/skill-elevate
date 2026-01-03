/**
 * Support Page Component
 * 
 * Support options for students and tutors.
 * 
 * @backend API Endpoint: POST /api/v1/support/ticket
 * @backend Request Body: { type: string, subject: string, message: string, priority: string }
 * @backend Expected Response: { success: boolean, ticketId: string }
 */

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  MessageCircle, Mail, Phone, Clock, Send, 
  HelpCircle, FileText, CreditCard, BookOpen 
} from 'lucide-react';

const supportChannels = [
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Instant chat support', value: 'Chat Now', href: 'https://wa.me/254700000000' },
  { icon: Mail, title: 'Email', desc: 'Response within 24hrs', value: 'support@mwanzo.co.ke', href: 'mailto:support@mwanzo.co.ke' },
  { icon: Phone, title: 'Phone', desc: 'Mon-Fri, 8AM-6PM', value: '+254 700 000 000', href: 'tel:+254700000000' },
];

const quickLinks = [
  { icon: HelpCircle, title: 'FAQ', desc: 'Common questions answered', href: '/faq' },
  { icon: FileText, title: 'Help Center', desc: 'Browse help articles', href: '/help' },
  { icon: CreditCard, title: 'Payment Issues', desc: 'M-Pesa troubleshooting', href: '/help/payments' },
  { icon: BookOpen, title: 'Course Help', desc: 'Learning support', href: '/help/courses' },
];

export default function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    message: '',
    priority: 'normal',
  });

  /**
   * Handle support ticket submission
   * @backend Replace with: POST /api/v1/support/ticket
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Support ticket created! We\'ll respond within 24 hours.');
    setFormData({ type: '', subject: '', message: '', priority: 'normal' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            We're Here to <span className="text-gradient">Help</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get support for your account, courses, payments, or any other questions.
          </p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8">Contact Us</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {supportChannels.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <channel.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{channel.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">{channel.desc}</p>
                <p className="text-sm font-medium text-primary">{channel.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Support Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-xl font-bold mb-6">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="payment">Payment & Billing</SelectItem>
                      <SelectItem value="course">Course Access</SelectItem>
                      <SelectItem value="certificate">Certificates</SelectItem>
                      <SelectItem value="job">Job Applications</SelectItem>
                      <SelectItem value="tutor">Tutor Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General question</SelectItem>
                      <SelectItem value="normal">Normal - Need help soon</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      Submit Ticket
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Quick Help</h2>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{link.title}</h3>
                        <p className="text-sm text-muted-foreground">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="p-5 rounded-xl bg-gradient-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * WhatsApp messages are monitored outside these hours for urgent issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
